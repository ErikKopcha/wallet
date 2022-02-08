import transactions from './transact.js';
import Chart from './Chart/Chart.js';
import styled from './Statistics.module.css';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Table from './Table/Table.js';
import ButtonControl from './ButtonControl/ButtonControl.js';
import wallet1 from '../../assets/images/wallet1.jpeg';

const randomColor = require('randomcolor');


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

export default function Statistics() {

  const [month, setMonth] = useState(JSON.parse(localStorage.getItem('month')) || '');
  const [year, setYear] = useState(JSON.parse(localStorage.getItem('year')) || '');
  const [color, setColor] = useState('#4a56e2');
  const [categories, setCategories] = useState({
    expenses: {}, income: 0,
  });


  const handleChangeMonth = e => {
    setMonth(e.target.value);
    localStorage.setItem('month', JSON.stringify(e.target.value));
  };
  const handleChangeYear = e => {
    setYear(e.target.value);
    localStorage.setItem('year', JSON.stringify(e.target.value));
  };

  useEffect(() => {
    if (month && year) {
      setColor(randomColor({ count: 10, luminosity: 'bright' }));
      setCategories({
        expenses: {}, income: 0,
      });

      transactions.filter(el => {
        const filterDate = new Date(el.transactionDate);
        if (
          filterDate.getFullYear() === year &&
          monthName[filterDate.getMonth()] === month &&
          el.type === 'EXPENSES'
        ) {

          setCategories(prev => {
            if (isNaN(prev.expenses[el.categoryId])) {
              return { ...prev, expenses: { ...prev.expenses, [el.categoryId]: el.amount } };
            }

            return {
              ...prev,
              expenses: { ...prev.expenses, [el.categoryId]: prev.expenses[el.categoryId] + el.amount },
            };
          });
        }
        if (
          filterDate.getFullYear() === year &&
          monthName[filterDate.getMonth()] === month &&
          el.type === 'INCOME'
        ) {
          setCategories(prev => {

            return { ...prev, income: prev.income + el.amount };
          });
        }
        return null;
      });
    }
  }, [month, year]);

  return (
    <Box className={styled.container}>
      {transactions.length > 1 ? (
        <>
          <Chart categories={categories} colors={color} />
          <section className={styled.TableContainer}>
            <ButtonControl handleChangeMonth={handleChangeMonth} handleChangeYear={handleChangeYear} month={month}
                           year={year} />
            <Table categories={categories} colors={color} month={month} year={year} />
          </section>
        </>
      ) : (
        <div className={styled.errorBox}>
          <img src={wallet1} alt='emptyWallet' />
        </div>
      )}
    </Box>
  );
}
