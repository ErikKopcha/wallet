import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination, Stack, Card, CardContent, Box, Typography, Tooltip,
} from '@mui/material';
import Media from 'react-media';

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

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Media query='(min-width: 580px)'>
        {
          matches => matches ? (
            <>
              <h1>Transaction table</h1>
              <TableContainer component={Paper}
                              sx={{ mt: '20px', maxHeight: '400px', background: 'transparent', boxShadow: 'none' }}>
                <Table stickyHeader
                       sx={{ boxShadow: 'none', '& .MuiTableCell': { borderLeft: 'none', borderRight: 'none' } }}
                       aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{
                      '& > *': { background: '#fff', fontSize: 18, textAlign: 'center' },
                      '& .column-date': { borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' },
                      '& .column-amount': { borderTopRightRadius: '100px', borderBottomRightRadius: '100px' },
                    }}>
                      {
                        //TODO: change name of classes (.column-date .column-amount) - it should be flexible!!!
                        columns.map((column) => {
                          return column.id === 'date' || column.id === 'amount' ?
                            <TableCell key={`column-${column.id}`}
                                       style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                       classes={{ root: `column-${column.id}` }}
                            >
                              {column.label}
                            </TableCell>
                            :
                            <TableCell key={column.id}
                                       style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                       classes={{ root: `column-${column.id}` }}>{column.label}</TableCell>;
                        })
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operations
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
                                <Tooltip key={`tooltip-${new Date().getTime()}`} title={operation[column.id]}>
                                  <TableCell key={`cell-${new Date().getTime()}`} style={{
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
                              )
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
                count={operations.length}
                page={page}
                onPageChange={handleChangePage}
                style={{ display: 'flex', justifyContent: 'space-around' }}
              />
            </>
          ) : (
            <Stack direction={'column'} sx={{ pb: '25px' }}>
              {
                operations.map(operation => (
                  <Card key={`card-${new Date().getTime()}`} style={{
                    borderRadius: '10px',
                    borderLeftWidth: '5px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: operation.type === '+' ? '#24CCA7' : '#FF6596',
                  }} sx={{
                    '&:not(:last-of-type)': {
                      marginBottom: '10px',
                    },
                    '& .MuiCardContent-root:last-child': {
                      pb: 0,
                    },
                  }}>
                    <CardContent sx={{ padding: 0 }}>
                      {
                        columns.map(column => (
                          <Box key={`box-${new Date().getTime()}`} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #DCDCDF',
                            height: '47px',
                            alignItems: 'center',
                            paddingX: '20px',
                          }}>
                            <Typography key={`column-label-${new Date().getTime()}`}>
                              {column.label}
                            </Typography>
                            {
                              operation[column.id].length >= 30 ? (
                                <Tooltip key={`toolTip--${new Date().getTime()}`} title={operation[column.id]}>
                                  <Typography key={`oper-${new Date().getTime()}`} sx={{
                                    maxWidth: '49%',
                                    width: '50%',
                                    display: 'block',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                  }}>
                                    {operation[column.id]}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Typography key={`operation-${new Date().getTime()}`} sx={{ maxWidth: '200px' }}>
                                  {operation[column.id]}
                                </Typography>
                              )
                            }
                          </Box>
                        ))
                      }
                    </CardContent>
                  </Card>
                ))
              }
            </Stack>
          )
        }
      </Media>

    </>
  );
};

export default DashTable;