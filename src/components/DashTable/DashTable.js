import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import zeroImage from '../../assets/images/zero.png';
import uniqid from 'uniqid';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { transactionSortingByDate } from '../../helpers/transactionSorting';

const DashTable = () => {

  let columns = [
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
  const { transactions, status } = useSelector((state) => state.transactions);
  const sortedTransactions = transactionSortingByDate(transactions);

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

  return (
    <>
      {
        status === 'loading' ? <Loader top={'500%'} left={'45%'} zIndex={5} /> :
          status === 'resolved' && transactions.length > 0 ? (
            <>
              <TableContainer
                sx={{ mt: '20px', maxHeight: '400px', background: 'transparent', boxShadow: 'none' }}>
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
                              style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                              sx={{
                                '&:first-of-type': {
                                  borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px',
                                },
                                '&:last-of-type': {
                                  borderTopRightRadius: '100px', borderBottomRightRadius: '100px',
                                },
                              }}
                            >
                              {column.label}
                            </TableCell>
                          );
                        })
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedTransactions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((transaction) => (
                        <TableRow
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
                            })
                          }
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
