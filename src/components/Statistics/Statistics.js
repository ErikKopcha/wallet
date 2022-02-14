import Chart from './Chart/Chart.js';
import styled from './Statistics.module.css';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Table from './Table/Table.js';
import ButtonControl from './ButtonControl/ButtonControl.js';
import zeroImage from '../../assets/images/zero.png';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
const randomColor = require('randomcolor');

export const getLastTransaction = transactions => {
  return new Date(
    [...transactions].sort((a, b) => {
      const dateA = new Date(a.transactionDate);
      const dateB = new Date(b.transactionDate);

      return dateB - dateA;
    })[0].transactionDate,
  );
};
const Statistics = props => {
  const [month, setMonth] = useState(
    JSON.parse(localStorage.getItem('month')) || '',
  );
  const [year, setYear] = useState(
    JSON.parse(localStorage.getItem('year')) || '',
  );
  const [monthSummary, setMonthSummary] = useState('');
  const {
    token,
    transactionsData: { transactions, categories },
  } = props;
  if (!month && !year) {
    const lastTransaction = getLastTransaction(transactions);
    setMonth(lastTransaction.getMonth() + 1);
    setYear(lastTransaction.getFullYear());
    
    localStorage.setItem(
      'month',
      JSON.stringify(lastTransaction.getMonth() + 1),
    );
    localStorage.setItem('year', JSON.stringify(lastTransaction.getFullYear()));
  }
  const color = randomColor({
    count: categories.length,
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
  const getSummaryOfMonth = useCallback(
    async (month, year) => {
      if (!month || !year) {
        return null;
      }
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(
          `https://wallet.goit.ua/api/transactions-summary?month=${month}&year=${year}`,
          requestOptions,
        );
        if (!response.ok) {
          throw new Error('Server error');
        } else {
          return await response.json();
        }
      } catch (error) {
        return error;
      }
    },
    [token],
  );
  useEffect(() => {
    getSummaryOfMonth(month, year).then(data => {
      setMonthSummary(data);
    });
  }, [month, year, getSummaryOfMonth]);
  return (
    <>
      {monthSummary !== '' ? (
        <Box className={styled.container}>
          {transactions.length > 1 ? (
            <>
              <Chart categoriesAll={monthSummary} colors={color} />
              <section className={styled.TableContainer}>
                <ButtonControl
                  handleChangeMonth={handleChangeMonth}
                  handleChangeYear={handleChangeYear}
                  month={month}
                  year={year}
                  transactions={transactions}
                />
                <Table
                  categoriesAll={monthSummary}
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
              <p className={styled.noTrans}>Create your first transaction.</p>
              <img
                src={zeroImage}
                alt={'noTransactions'}
                style={{ width: '60vh' }}
              />
            </div>
          )}
        </Box>
      ) : (
        <Loader top={'500%'} left={'45%'} zIndex={5} />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  transactionsData: state.transactions,
  token: state.session.authToken,
});

export default connect(mapStateToProps)(Statistics);
