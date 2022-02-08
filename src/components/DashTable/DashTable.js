import React, { useState } from 'react';
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

const DashTable = () => {

  let columns = [
    {
      id: 'date',
      label: 'Date',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'type',
      label: 'Type',
      minWidth: '50px',
      maxWidth: '80px',
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'comments',
      label: 'Comments',
      minWidth: '80px',
      maxWidth: '150px',
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: '100px',
      maxWidth: '150px',
    },
  ];
  const transactions = useSelector((state) => state.transactions);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const noTransaction = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{marginBottom: '20px'}}>Sorry, now you don't have any transaction(</h1>
        <img src={zeroImage} alt={'noTransactions'} style={{width: '60vh'}} />
      </div>
    );
  };

  return (
    <>
      {
        transactions.length > 0 ? (
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
                            key={`column-${column.id}-${new Date().getTime()}-${Math.random()}`}
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
                  {transactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((operation) => (
                      <TableRow
                        hover
                        role='checkbox'
                        key={`row-${new Date().getTime()}-${Math.random()}`}
                        sx={{ '& > *': { textAlign: 'center' } }}
                      >
                        {
                          columns.map((column) => {
                            const value = operation[column.id];
                            return value.length >= 30 ? (
                              <Tooltip key={`tooltip-${new Date().getTime()}-${Math.random()}`}
                                       title={operation[column.id]}>
                                <TableCell key={`cell-${new Date().getTime()}-${Math.random()}`} style={{
                                  maxWidth: column.maxWidth,
                                  minWidth: column.minWidth,
                                  width: '99%',
                                  display: 'block',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                }}>
                                  {operation[column.id]}
                                </TableCell>
                              </Tooltip>
                            ) : (
                              <TableCell style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
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
            <TablePagination
              rowsPerPageOptions={[]}
              rowsPerPage={rowsPerPage}
              component='div'
              count={transactions.length}
              page={page}
              onPageChange={handleChangePage}
              style={{ display: 'flex', justifyContent: 'space-around' }}
            />
          </>
        ) : noTransaction()
      }
    </>
  );
};
export default DashTable;