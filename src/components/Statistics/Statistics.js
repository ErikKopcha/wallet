import Chart from './Chart/Chart.js';
import styled from './Statistics.module.css';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Table from './Table/Table.js';
import ButtonControl from './ButtonControl/ButtonControl.js';
import zeroImage from '../../assets/images/zero.png';
import { connect } from 'react-redux';

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

const Statistics = ({ AllTransactions }) => {
  const [month, setMonth] = useState(
    JSON.parse(localStorage.getItem('month')) || '',
  );
  const [year, setYear] = useState(
    JSON.parse(localStorage.getItem('year')) || '',
  );

  const [categories, setCategories] = useState({
    expenses: {},
    income: 0,
  });

  const transactions = AllTransactions;

  if (!month && !year) {
    console.log(1);
    const lastTransactions = new Date(
      [...transactions].sort((a, b) => {
        const dateA = new Date(a.transactionDate);
        const dateB = new Date(b.transactionDate);

        return dateB - dateA;
      })[0].transactionDate,
    );
    setMonth(monthName[lastTransactions.getMonth()]);
    setYear(lastTransactions.getFullYear());
    localStorage.setItem(
      'month',
      JSON.stringify(monthName[lastTransactions.getMonth()]),
    );
    localStorage.setItem(
      'year',
      JSON.stringify(lastTransactions.getFullYear()),
    );
  }

  const color = randomColor({
    count: Object.keys(categories.expenses).length,
    luminosity: 'bright',
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
      setCategories({
        expenses: {},
        income: 0,
      });

      transactions.filter(el => {
        const filterDate = new Date(el.transactionDate);

        if (
          filterDate.getFullYear() === year &&
          monthName[filterDate.getMonth()] === month &&
          el.type === 'EXPENSE'
        ) {
          setCategories(prev => {
            if (isNaN(prev.expenses[el.categoryId])) {
              return {
                ...prev,
                expenses: { ...prev.expenses, [el.categoryId]: el.amount },
              };
            }

            return {
              ...prev,
              expenses: {
                ...prev.expenses,
                [el.categoryId]: prev.expenses[el.categoryId] + el.amount,
              },
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
  }, [month, year, transactions]);

  return (
    <Box className={styled.container}>
      {transactions.length > 1 ? (
        <>
          <Chart categories={categories} colors={color} />
          <section className={styled.TableContainer}>
            <ButtonControl
              handleChangeMonth={handleChangeMonth}
              handleChangeYear={handleChangeYear}
              month={month}
              year={year}
              transactions={transactions}
            />
            <Table
              categories={categories}
              colors={color}
              month={month}
              year={year}
            />
          </section>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={zeroImage}
            alt={'noTransactions'}
            style={{ width: '60vh' }}
          />
        </div>
      )}
    </Box>
  );
};

const mapStateToProps = state => ({
  AllTransactions: state.transactions,
});

export default connect(mapStateToProps)(Statistics);
