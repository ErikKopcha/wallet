import { Select, InputLabel, FormControl, Box, MenuItem } from '@mui/material';
import styled from '../Statistics.module.css';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const monthName = [
  null,
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

export default function ButtonControl(props) {
  const {
    handleChangeMonth,
    handleChangeYear,
    month,
    year,
    transactions,
  } = props;

  const addMonth = () => {
    return transactions
      .map(el => {
        const date = new Date(el.transactionDate);
        if (year && date.getFullYear() === year) {
          return date.getMonth() + 1;
        }

        if (year === '') {
          return date.getMonth() + 1;
        } else {
          return null;
        }
      })
      .sort((a, b) => {
        return a - b;
      })
      .filter((mon, index, array) => {
        return array.indexOf(mon) === index;
      })
      .map(el => {
        return (
          <MenuItem key={uuidv4()} value={monthName[el]}>
            {monthName[el]}
          </MenuItem>
        );
      });
  };
  const addYear = () => {
    return transactions
      .map(el => {
        const date = new Date(el.transactionDate);

        if (month && monthName[date.getMonth() + 1] === month) {
          return date.getFullYear();
        }
        if (month === '') {
          return date.getFullYear();
        }
        return null;
      })
      .filter((yearFilter, index, array) => {
        return array.indexOf(yearFilter) === index;
      })
      .sort((a, b) => {
        return a - b;
      })
      .map(el => {
        if (el === null) {
          return;
        }
        return (
          <MenuItem key={uuidv4()} value={el}>
            {el}
          </MenuItem>
        );
      });
  };

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
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0)',
              },
              '& .Mui-focused': {
                backgroundColor: 'transparent',
                color: 'rgba(0, 0, 0)',
              },
              '& .MuiFilledInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottom: 0,
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: 0,
                },
                '&:after': {
                  borderBottom: '0px',
                },
              },
              '& .MuiFilledInput-input': {
                '&:focus': {
                  backgroundColor: 'transparent',
                  color: 'black',
                },
              },
            }}
          >
            <InputLabel
              sx={{
                '& .Mui-focused': {
                  backgroundColor: 'transparent',
                  color: 'rgba(0, 0, 0)',
                },
                '& .MuiInputLabel-focused': {
                  color: 'black',
                },
              }}
              id="demo-simple-select-standard-label"
            >
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
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0)',
              },
              '& .Mui-focused': {
                backgroundColor: 'transparent',
                color: 'rgba(0, 0, 0)',
              },
              '& .MuiFilledInput-root': {
                backgroundColor: 'transparent',
                '&:before': {
                  borderBottom: 0,
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: 0,
                },
                '&:after': {
                  borderBottom: '0px',
                },
              },
              '& .MuiFilledInput-input': {
                '&:focus': {
                  backgroundColor: 'transparent',
                  color: 'black',
                },
              },
            }}
          >
            <InputLabel
              sx={{
                '& .Mui-focused': {
                  backgroundColor: 'transparent',
                  color: 'rgba(0, 0, 0)',
                },
                ' MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
              }}
              id="demo-simple-select-standard-label"
            >
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
  );
}
