import { Select, InputLabel, FormControl, Box, MenuItem } from '@mui/material';  
import styled from '../Statistics.module.css'
import transactions from '../transact.js';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';


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

    export default function ButtonControl (props){
const {handleChangeMonth,handleChangeYear,month,year} = props;

const addMonth = ()=>{

 return transactions.map(el => {
                    const date = new Date(el.transactionDate);
                    if(year && date.getFullYear()===year){
                      return monthName[date.getMonth()]
                    }
                    if(year === ''){
                    return monthName[date.getMonth()]} else {return null}
                  })
                  .filter((mon, index, array) => {
                    if(month && year){

                    }
                    
                    return array.indexOf(mon) === index})
                  .map(el => {
                    return (
                      <MenuItem key={uuidv4()} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })
}
const addYear = ()=>{
  return transactions.map(el => {
    const date = new Date(el.transactionDate);
 if(month && monthName[date.getMonth()]=== month){
  return date.getFullYear();
 }
    if(month === ''){
      return date.getFullYear();
    }
    else {return null}
  })
  .filter((yearFilter, index, array) => {
  
    
    return array.indexOf(yearFilter) === index})
  .map(el => {
    
    return (
      <MenuItem key={uuidv4()} value={el}>
        {el}
      </MenuItem>
    );
  })


}



        return (
            <>
             <Box className={styled.buttonBox}>
          <Box className={styled.button}>
            <FormControl
              variant="filled"
              sx={{
                width: '100%',
                backgroundColor: 'transparent',
                height: 30,
                '& .MuiFilledInput-root': {
                  backgroundColor: 'transparent',
                  '&:before': {
                    borderBottom: 0,
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: 0,
                  },
                },
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Month
              </InputLabel>
              <Select
                defaultValue=""
                sx={{
                  borderRadius: 30,
                  border: '1px solid black',
                  width: '100%',
                }}
                value={month}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeMonth}
              >
                {addMonth()}
              </Select>
            </FormControl>
          </Box>
          <Box className={styled.button}>
            <FormControl
              variant="filled"
              sx={{
                width: '100%',
                backgroundColor: 'transparent',
                height: 30,
                '& .MuiFilledInput-root': {
                  backgroundColor: 'transparent',
                  '&:before': {
                    borderBottom: 0,
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: 0,
                  },
                },
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Year
              </InputLabel>
              <Select
                defaultValue=""
                sx={{
                  borderRadius: 30,
                  border: '1px solid black',
                  width: '100%',
                }}
                value={year}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChangeYear}
              >
                {addYear()}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className={styled.tableHeader}>
          <p className={styled.category}>Category</p>
          <p className={styled.amount}>Amount</p>
        </Box>
            </>
        )
    }