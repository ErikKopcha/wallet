import transactions from './transact.js';
import Chart from './Chart/Chart.js';
import styled from './Statistics.module.css';
import React, { useEffect, useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import {makeStyles} from '@mui/styles';

const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const useStyles = makeStyles({
  root: {
    width: '100%',

    '& .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
      borderRadius: 30,
      width: '100%',
    },
  },
});

export default function Statistics(props) {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [categories, setCategories] = useState({
    Main: 8,
    Food: 7,
    Car: 6,
    Development: 5,
    Kids: 4,
    House: 3,
    Education: 2,
    Other: 1,
  });

  const classes = useStyles();

  const handleChangeMonth = e => {
    setMonth(e.target.value);
  };
  const handleChangeYear = e => {
    setYear(e.target.value);
  };
  useEffect(() => {}, [month]);

  return (
    <Box className={styled.container}>
      <Chart categories={categories} />
      <section className={styled.TableContainer}>
        <Box className={styled.buttonBox}>
          <Box className={styled.button}>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Month"
              value={month}
              select
              onChange={handleChangeMonth}
            >
              {transactions
                .map(el => {
                  const date = new Date(el.transactionDate);

                  return monthName[date.getMonth()];
                })
                .filter((mon, index, array) => array.indexOf(mon) === index)
                .map(el => {
                  return (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  );
                })}
            </TextField>
          </Box>
          <Box className={styled.button}>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Year"
              value={year}
              select
              onChange={handleChangeYear}
            >
              {transactions
                .map(el => {
                  const date = new Date(el.transactionDate);

                  return date.getFullYear();
                })
                .filter((year, index, array) => array.indexOf(year) === index)
                .map(el => {
                  return (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  );
                })}
            </TextField>
          </Box>
        </Box>
        <Box className={styled.tableHeader}>
          <p className={styled.category}>Category</p>
          <p className={styled.amount}>Amount</p>
        </Box>
        <ul className={styled.table}>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Main}></div>{' '}
            <p className={styled.itemName}>Main expenses</p>{' '}
            <p className={styled.itemAmount}>{categories.Main}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Food}></div>{' '}
            <p className={styled.itemName}>Food</p>{' '}
            <p className={styled.itemAmount}>{categories.Food}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Car}></div>{' '}
            <p className={styled.itemName}>Car</p>{' '}
            <p className={styled.itemAmount}>{categories.Car}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Development}></div>{' '}
            <p className={styled.itemName}>Development</p>{' '}
            <p className={styled.itemAmount}>{categories.Development}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Kids}></div>{' '}
            <p className={styled.itemName}>Kids</p>{' '}
            <p className={styled.itemAmount}>{categories.Kids}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.House}></div>{' '}
            <p className={styled.itemName}>House</p>{' '}
            <p className={styled.itemAmount}>{categories.House}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Education}></div>{' '}
            <p className={styled.itemName}>Education</p>{' '}
            <p className={styled.itemAmount}>{categories.Education}</p>
          </li>
          <li className={styled.tableItem}>
            {' '}
            <div className={styled.Other}></div>{' '}
            <p className={styled.itemName}>Other</p>{' '}
            <p className={styled.itemAmount}>{categories.Other}</p>
          </li>
        </ul>
        <p className={styled.expenses}>
          Expenses:<span className={styled.expensesValue}>4500</span>
        </p>
        <p className={styled.incomes}>
          Incomes:<span className={styled.incomesValue}>4500</span>
        </p>
      </section>
    </Box>
  );
}
