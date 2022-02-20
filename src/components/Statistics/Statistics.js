import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Table from './Table/Table.js';
import { connect } from 'react-redux';
import { useCallback } from 'react';

import Chart from 'components/Statistics/Chart/Chart.js';
import styled from 'components/Statistics/Statistics.module.css';
import ButtonControl from './ButtonControl/ButtonControl.js';
import zeroImage from 'assets/images/zero.png';
import Loader from 'components/Loader/Loader';

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
  const [currentCoin,setCurrentCoin] = useState( JSON.parse(localStorage.getItem('currentCoin')) ||'USD')
  const {
    token,
    transactionsData: { transactions, categories },
  } = props;
  
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
    if(month && year){
    getSummaryOfMonth(month, year).then(data => {
      const arr = {...data,categoriesSummary: data.categoriesSummary.filter((el)=>{
        return el.type==='EXPENSE'})}

      setMonthSummary(arr);
    });}
  }, [month, year, getSummaryOfMonth]);
  
  if (!month && !year && transactions.length>0) {


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
  const handleChangeCoin = e => {
setCurrentCoin(e.target.value)
localStorage.setItem('currentCoin', JSON.stringify(e.target.value))
  }
  const handleChangeMonth = e => {
    setMonth(e.target.value);
    localStorage.setItem('month', JSON.stringify(e.target.value));
    
  };
  const handleChangeYear = e => {
    localStorage.setItem('year', JSON.stringify(e.target.value));
  const filter  = transactions.find((el)=>{
const date = new Date(el.transactionDate)
return date.getFullYear() === e.target.value && date.getMonth()+1 === month
    })

    if(filter === undefined) {

      const monthS = new Date(
        [...transactions].sort((a, b) => {
          const dateA = new Date(a.transactionDate);
          const dateB = new Date(b.transactionDate);
          return dateB - dateA;
        }).find((el)=>{
          const date = new Date(el.transactionDate);
        return date.getFullYear() === e.target.value}).transactionDate);
        setYear(e.target.value);
      setMonth(monthS.getMonth() + 1);
      localStorage.setItem('year', JSON.stringify(e.target.value));
      localStorage.setItem('month', JSON.stringify(monthS.getMonth() + 1));
      return
    }
    setYear(e.target.value);
    localStorage.setItem('year', JSON.stringify(e.target.value));
  };


  


  return (
    <>
      {transactions.length > 0 ? (
        <Box className={styled.container}>
          { monthSummary !== '' ? (
            <>
              <Chart               
                  currentCoin={currentCoin} categoriesAll={monthSummary} colors={color} />
              <section className={styled.TableContainer}>
                <ButtonControl
                handleChangeCoin={handleChangeCoin}
                  handleChangeMonth={handleChangeMonth}
                  handleChangeYear={handleChangeYear}
                  month={month}
                  year={year}
                  transactions={transactions}
currentCoin={currentCoin}
                />
                <Table
                currentCoin={currentCoin}
                  categoriesAll={monthSummary}
                  colors={color}
                  month={month}
                  year={year}
                />
              </section>
            </>
          ) : (
            <Loader top={'500%'} left={'45%'} zIndex={5} /> 
          )}
        </Box>
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
    </>
  );
};

const mapStateToProps = state => ({
  transactionsData: state.transactions,
  token: state.session.authToken,
});

export default connect(mapStateToProps)(Statistics);
