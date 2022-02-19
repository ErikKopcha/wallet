import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, Tooltip,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import style from './DashTable.module.css';
import zeroImage from 'assets/images/zero.png';
import Loader from 'components/Loader/Loader';
import { transactionSortingByDate } from 'helpers/transactionSorting';
import { transactionRefactor } from 'helpers/transactionRefactor';
import { deleteTransaction } from 'redux/transactions';
import { fetchCurrentUser } from 'redux/user';

const columns = [
  {
    id: 'date',
    label: 'Date',
    minWidth: '80px',
    maxWidth: '150px',
    fontSize: '16px',
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: '50px',
    maxWidth: '80px',
    fontSize: '18px',
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: '80px',
    maxWidth: '150px',
    fontSize: '16px',
  },
  {
    id: 'comment',
    label: 'Comments',
    minWidth: '80px',
    maxWidth: '150px',
    fontSize: '16px',
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: '100px',
    maxWidth: '150px',
    fontSize: '16px',
  },
];

const DashTable = () => {

  const { transactions, status, categories } = useSelector((state) => state.transactions);
  const sortedTransactions = transactionSortingByDate(transactions);
  const editedTransactions = sortedTransactions.map(transaction => transactionRefactor(transaction, categories));
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const noTransaction = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Sorry, now you don't have any transaction(</h1>
        <img src={zeroImage} alt={'noTransactions'} style={{ width: '60vh' }} />
      </div>
    );
  };

  const deleteTransactionFromTable = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
    dispatch(fetchCurrentUser())
    localStorage.setItem('year', '');
    localStorage.setItem('month', '');
  };

  return (
    <>
      {
        status === 'loading' ? <Loader top={'500%'} left={'45%'} zIndex={5} /> :
          status === 'resolved' && transactions.length > 0 ? (
            <>
              <TableContainer
                sx={{ maxHeight: '400px', background: 'transparent', boxShadow: 'none' }}>
                <Table stickyHeader
                       sx={{ boxShadow: 'none', '& .MuiTableCell': { borderLeft: 'none', borderRight: 'none' } }}
                       aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ '& > *': { background: '#fff', fontSize: 18, textAlign: 'center' } }}>
                      {
                        columns.map((column) => {
                          return (
                            <TableCell
                              key={uniqid()}
                              style={column.id === 'amount' ? {
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                                borderTopRightRadius: '100px',
                                borderBottomRightRadius: '100px',
                                borderBottom: 'none',
                              } : {
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                                borderBottom: 'none',
                              }}
                              sx={{
                                '&:first-of-type': {
                                  borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px',
                                },
                              }}
                            >
                              {column.label}
                            </TableCell>
                          );
                        })
                      }
                      <TableCell sx={{ width: '50px', backgroundColor: 'transparent', borderBottom: 'none' }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editedTransactions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((transaction) => (
                        <TableRow
                          className={style.tableBodyRow}
                          hover
                          role='checkbox'
                          key={uniqid()}
                          sx={{ '& > *': { textAlign: 'center' } }}
                        >
                          {
                            columns.map((column) => {
                              const value = transaction[column.id];
                              return value.length >= 30 ? (
                                <Tooltip key={uniqid()}
                                         title={transaction[column.id]}>
                                  <TableCell key={uniqid()} style={{
                                    maxWidth: column.maxWidth,
                                    minWidth: column.minWidth,
                                    fontSize: column.fontSize,
                                    width: '99%',
                                    display: 'block',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    fontWeight: 'lighter'
                                  }}>
                                    {transaction[column.id]}
                                  </TableCell>
                                </Tooltip>
                              ) : (
                                <TableCell key={uniqid()} style={{
                                  minWidth: column.minWidth,
                                  maxWidth: column.maxWidth,
                                  fontSize: column.fontSize,
                                }}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          <TableCell sx={{ pl: 0 }}>
                            <DeleteOutlineOutlinedIcon className={style.deleteIcon}
                                                       onClick={() => deleteTransactionFromTable(transaction.id)}
                                                       sx={{ color: theme => theme.palette.secondary.main }} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {
                transactions.length > 5 && (
                  <TablePagination
                    rowsPerPageOptions={[]}
                    rowsPerPage={rowsPerPage}
                    component='div'
                    count={transactions.length}
                    page={page}
                    onPageChange={handleChangePage}
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  />
                )
              }
            </>
          ) : status === 'resolved' ? noTransaction() : null
      }
    </>
  );
};

export default DashTable;
