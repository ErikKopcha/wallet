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
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    {
      date: '11.01.2022',
      type: '-',
      category: 'Products',
      comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
      amount: '123',
    },
    { date: '22.01.2022', type: '+', category: 'Car', comments: 'ghjghjgh', amount: '565656' },
  ];

  let columns = [
    {
      id: 'date',
      label: 'Date',
      minWidht: '100px',
      maxWidth: '200px',
    },
    {
      id: 'type',
      label: 'Type',
      minWidht: '100px',
      maxWidth: '200px',
    },
    {
      id: 'category',
      label: 'Category',
      minWidht: '100px',
      maxWidth: '200px',
    },
    {
      id: 'comments',
      label: 'Comments',
      minWidht: '100px',
      maxWidth: '270px',
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidht: '100px',
      maxWidth: '200px',
    },
  ];

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <h1>Transaction table</h1>
      <TableContainer component={Paper}
                      sx={{ mt: '20px', maxHeight: '400px', background: 'transparent', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650, boxShadow: 'none', '& .MuiTableCell': { borderLeft: 'none', borderRight: 'none' } }}
               aria-label='simple table'>
          <TableHead>
            <TableRow sx={{
              '& > *': { background: '#fff', fontSize: 18, textAlign: 'center' },
              '& .column-date': { display: 'block', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' },
              '& .column-amount': { display: 'block', borderTopRightRadius: '100px', borderBottomRightRadius: '100px' },
            }}>
              {
                //TODO: change name of classes (.column-0 .column-4) - it should be flexible!!!
                columns.map((column) => <TableCell style={{minWidth: column.minWidht, maxWidth: column.maxWidth}} classes={{ root: `column-${column.id}`}}>{column.label}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody className={style.tableBody}>
            {operations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((operation) => (
                <TableRow
                  hover
                  role='checkbox'
                  key={Math.random()}
                  sx={{ '& > *': { textAlign: 'center' } }}
                >
                  {
                    columns.map((column) => {
                      const value = operation[column.id];
                      return (
                        <TableCell key={column.id} style={{minWidth: column.minWidht, maxWidth: column.maxWidth}}>{value}</TableCell>
                      )
                    })
                  }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={false}
        rowsPerPage={rowsPerPage}
        component='div'
        count={operations.length}
        page={page}
        onPageChange={handleChangePage} />
    </>
  );
};

export default DashTable;