import { Modal, Typography, Stack, Button, Grid, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import style from './ModalAddTransaction.module.css';
import StyledSwitch from '../StyledSwitch/StyledSwitch';
import { useState } from 'react';
import {useDispatch} from 'react-redux';

const ModalAddTransaction = ({isOpen, onClose}) => {
  let categories = ['Main', 'Food', 'Car', 'Development', 'Kids', 'House', 'Education', 'Others'];

  const [value, setValue] = useState(new Date());
  const [category, setCategory] = useState('');
  const [income, setIncome] = useState(true);

  const dispatch = useDispatch();

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeTypeOfTransaction = (event) => {
    setIncome((income) => !income);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={style.box}>
        <Typography id='modal-modal-title' variant='h1' component='h1' sx={{ mb: '40px' }}>
          Add transaction
        </Typography>
        <Stack direction='row' spacing='20px' alignItems='center' sx={{ mb: '38px' }}>
          <Typography sx={{ color: '#24CCA7' }}>
            Income
          </Typography>
          <StyledSwitch
            onChange={changeTypeOfTransaction}
          />
          <Typography sx={{ color: '#FF6596' }}>
            Expenses
          </Typography>
        </Stack>
        <Grid container columnSpacing='30px' rowSpacing='40px' sx={{ width: '100%' }}>
          {income || <Grid item sm={12} xs={12} md={12}>
            <InputLabel id='selectCategoryLabel'>Select a category</InputLabel>
            <Select
              labelId='selectCategoryLabel'
              id='selectCategoryField'
              value={category}
              variant='standard'
              label='Select a category'
              onChange={changeCategory}
              sx={{ width: '100%' }}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category}>{category}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          }
          <Grid item sm={6} xs={6} md={6}>
            <TextField id='amountField' placeholder='0.00' variant='standard' />
          </Grid>
          <Grid item sm={6} xs={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
              <DatePicker
                mask='__.__.____'
                value={value}
                views={['year', 'month', 'day']}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} id='dateField' variant='standard' />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <TextField id='commentsField' placeholder='Comment' variant='standard' sx={{ width: '100%' }} />
          </Grid>
        </Grid>
        <Stack sx={{ mt: '50px' }}>
          <Button variant='contained' sx={{ color: '#fff', mb: '20px' }} onClick={onClose} >Add</Button>
          <Button variant='outlined'  onClick={onClose}>Cancel</Button>
        </Stack>
      </div>
    </Modal>
  );
};

export default ModalAddTransaction;