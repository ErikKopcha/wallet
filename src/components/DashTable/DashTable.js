import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import style from './DashTable.module.css';

const DashTable = () => {

  let operations = [
    { date: '22.01.2022', type: '+', category: 'Car', comments: 'ghjghjgh', amount: '123' },
    {
      date: '22.01.2022',
      type: '+',
      category: 'Car',
      comments: 'ghjgfnsvs dvlbldvjsdv slbjdvsbjld svjlbsd vlbjhjgh',
      amount: '123',
    },
    { date: '01.05.2020', type: '-', category: 'Car', comments: 'ghjghjgh', amount: '56' },
    {
      date: '10.01.2021',
      type: '+',
      category: 'Car',
      comments: 'ghjghd fljdljdbldzjnlb djlz;zndljb fgndbfjgh',
      amount: '123',
    },
    { date: '22.01.2022', type: '-', category: 'Other', comments: 'ghjghjgh', amount: '45656' },
    { date: '22.01.2022', type: '+', category: 'Car', comments: 'ghjghjgh', amount: '123' },
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    { date: '22.01.2022', type: '+', category: 'Car', comments: 'ghjghjgh', amount: '565656' },
  ];

  let columns = ['Date', 'Type', 'Category', 'Comments', 'Amount'];

  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => setPage(newPage);

  return (
    <>
      <h1>Transaction table</h1>
      <TableContainer component={Paper}
                      sx={{ mt: '20px', maxHeight: '400px', background: 'transparent', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650, boxShadow: 'none', '& .MuiTableCell': { borderLeft: 'none', borderRight: 'none' } }}
               aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ '& > *': { background: '#fff', fontSize: 18, textAlign: 'center' }, '& .Date' : {display: 'block', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px'}, '& .Amount': {display: 'block', borderTopRightRadius: '100px', borderBottomRightRadius: '100px'}}}>
              {
                //TODO: change name of classes (.Amount .Date) - it should be flexible!!!
                columns.map((column) => <TableCell classes={{root: column}}>{column}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody className={style.tableBody}>
            {operations.map((operation) => (
              <TableRow
                key={Math.random()}
                sx={{'& > *': { textAlign: 'center' } }}
              >
                <TableCell>{operation.date}</TableCell>
                <TableCell>{operation.type}</TableCell>
                <TableCell>{operation.category}</TableCell>
                <TableCell
                  sx={{ maxWidth: '200px', wordWrap: 'wrap', padding: '0px 50px' }}>{operation.comments}</TableCell>
                <TableCell>{operation.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={10}
        component='div'
        count={operations.length}
        page={page}
        onPageChange={handleChangePage} />
    </>
  );
};

export default DashTable;