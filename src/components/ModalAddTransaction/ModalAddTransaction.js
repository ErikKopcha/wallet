import {
  Modal,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import style from './ModalAddTransaction.module.css';
import StyledSwitch from '../StyledSwitch/StyledSwitch';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addTransaction } from '../../features/transactions';

const ModalAddTransaction = ({ isOpen, onClose }) => {
  let categories = ['Main', 'Food', 'Car', 'Development', 'Kids', 'House', 'Education', 'Others'];

  const validationSchema = yup.object({
    category: yup
      .string('Choose a category')
      .required('Category is required'),
    amount: yup
      .number('Enter a number')
      .required('Amount is required')
      .positive('Number should be positive'),
    date: yup
      .date('Enter a correct format of the date')
      .required('Date is required'),
    comments: yup
      .string(),
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category: '',
      type: false,
      amount: '',
      date: new Date(),
      comments: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(values.date.toLocaleString());
      const obj = { ...values, date: values.date.toLocaleDateString() };
      alert(JSON.stringify(obj));
      dispatch(addTransaction(obj));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const [income, setIncome] = useState(true);

  const changeTypeOfTransaction = () => {
    setIncome((income) => !income);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overflowY: 'scroll' }}
    >
      <form className={style.box} onSubmit={formik.handleSubmit}>
        <Typography id='modal-modal-title' variant='h1' component='h1' sx={{ mb: '40px' }}>
          Add transaction
        </Typography>
        <Stack direction='row' spacing='20px' alignItems='center' sx={{ mb: '38px' }}>
          <Typography sx={{ color: '#24CCA7' }}>
            Income
          </Typography>
          <StyledSwitch
            name='type'
            onChange={changeTypeOfTransaction}
          />
          <Typography sx={{ color: '#FF6596' }}>
            Expenses
          </Typography>
        </Stack>
        <Grid container columnSpacing='30px' rowSpacing='40px' sx={{
          width: '100%',
          '& .MuiList-root': {
            backgroundColor: 'red',
          },
          '& .MuiPaper-root': {
            backgroundColor: 'red',
          },
        }}>
          {
            income ||
            <Grid item sm={12} xs={12} md={12}>
              <InputLabel id='selectCategoryLabel'>Select a category</InputLabel>
              <Select
                labelId='selectCategoryLabel'
                name='category'
                variant='standard'
                MenuProps={{
                  sx: {
                    '& .MuiPaper-root': {
                      background: 'rgba(0, 0, 0, 0.07)',
                      backdropFilter: 'blur(50px)',
                      borderRadius: '20px',
                    }
                  },
                }}
                value={formik.values.category}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                sx={{
                  width: '100%',
                }}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem key={`category-${new Date().getTime()}-${Math.random()}`} value={category}
                              sx={{ background: 'transparent', '&:hover': {background: 'rgba(255, 255, 255, 0.7)', color: '#FF6596'}}}>{category}</MenuItem>
                  );
                })
                }
              </Select>
            </Grid>
          }
          <Grid item sm={6} xs={6} md={6}>
            <TextField id='amount'
                       name='amount'
                       placeholder={'0.00'}
                       value={formik.values.amount}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={formik.touched.amount && Boolean(formik.errors.amount)}
                       helperText={formik.touched.amount && formik.errors.amount} variant='standard'
                       sx={{ textAlign: 'center' }} />
          </Grid>
          <Grid item sm={6} xs={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
              <DatePicker
                id='date'
                name='date'
                mask='__.__.____'
                views={['year', 'month', 'day']}
                value={formik.values.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.date && formik.errors.date}
                OpenPickerButtonProps={{ sx: { color: theme => theme.palette.secondary.dark } }}
                onChange={newValue => formik.setFieldValue('date', newValue)}
                renderInput={(params) => <TextField {...params} id='dateField' variant='standard' />}
                sx={{
                  '& .MuiModal-root-MuiDialog-root .MuiDialog-paper': {
                    background: 'red',
                    backdropFilter: 'blur(0px)',
                    borderRadius: '20px',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <TextField
              id='comments'
              placeholder='Comment'
              variant='standard'
              value={formik.values.comments}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} error={formik.touched.comments && Boolean(formik.errors.comments)}
              helperText={formik.touched.comments && formik.errors.comments}
              sx={{ width: '100%' }} />
          </Grid>
        </Grid>
        <Stack sx={{ mt: '50px' }}>
          <Button
            type='submit'
            variant='contained'
            sx={{ color: '#fff', mb: '20px' }}>Add</Button>
          <Button variant='outlined' onClick={onClose}>Cancel</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalAddTransaction;