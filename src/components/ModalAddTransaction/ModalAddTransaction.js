import {
  Modal,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  InputLabel, MenuItem, Select,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import style from './ModalAddTransaction.module.css';
import StyledSwitch from '../StyledSwitch/StyledSwitch';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import useTransactionsService from '../../services/transactionsService';
import { useMediaQuery } from 'react-responsive';
import { closeModalAddTransaction } from '../../features/global';

const ModalAddTransaction = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 420px)' });

    const { postTransaction } = useTransactionsService();

    const categories = useSelector(state => state.categories);

    const validationSchema = yup.object({
      type: yup
        .bool(),
      category: yup
        .string()
        .notRequired()
        .when('type', {
          is: true,
          then: yup
            .string('Choose a category')
            .required('Category is required'),
        }),
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

    const formik = useFormik({
      initialValues: {
        type: true,
        category: '',
        amount: '',
        date: new Date(),
        comments: '',
      },
      validationSchema: validationSchema,
      onSubmit: (newTransaction) => {
        const categoryId = categories.find(category => category.name === newTransaction.category).id;
        const transaction = {
          transactionDate: newTransaction.date.toISOString(),
          type: newTransaction.type === true ? 'INCOME' : 'EXPENSE',
          categoryId:  newTransaction.type === true ? categories.find(category => category.type === 'INCOME').id : categoryId,
          comment: newTransaction.comments,
          amount: newTransaction.type === true ? newTransaction.amount : '-' + newTransaction.amount,
        };
        alert(JSON.stringify(transaction));
        postTransaction(transaction);
      },
    });

    const isModalOpen = useSelector(state => state.global.isModalAddTransactionOpen);
    const dispatch = useDispatch();

    const onClose = () => {
      dispatch(closeModalAddTransaction());
    };

    const handleSubmit = (e) => {
      formik.handleSubmit(e);
      dispatch(closeModalAddTransaction());
    };

    return (
      <Modal
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ overflowY: 'scroll', zIndex: 200 }}
        style={isMobile ? { width: '100%', height: '100%', top: '30px' } : { top: '50px' }}
      >
        <form className={style.box} onSubmit={handleSubmit}>
          <Typography id='modal-modal-title' variant='h1' component='h1' sx={{ mb: '40px' }}>
            Add transaction
          </Typography>
          <Stack direction='row' spacing='20px' alignItems='center' sx={{ mb: '38px' }}>
            <Typography style={formik.values.type === true ? { color: '#24CCA7' } : { color: '#E0E0E0' }}>
              Income
            </Typography>
            <StyledSwitch
              id='type'
              name='type'
              defaultChecked={true}
              value={formik.values.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.type && formik.errors.type}
            />
            <Typography style={formik.values.type === false ? { color: '#FF6596' } : { color: '#E0E0E0' }}>
              Expenses
            </Typography>
          </Stack>
          <Grid container columnSpacing='30px' rowSpacing='40px'>
            {
              formik.values.type === false &&
              <Grid item sm={12} xs={12} md={12}>
                <InputLabel id='selectCategoryLabel'>Select a category</InputLabel>
                <Select
                  labelId='selectCategoryLabel'
                  name='category'
                  variant='standard'
                  label='Select a category'
                  value={formik.values.category}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange} error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                  MenuProps={{
                    sx:
                      {
                        '& .MuiPaper-root': {
                          backgroundColor: 'rgba(0, 0, 0, 0.07)',
                          backdropFilter: 'blur(50px)',
                          '& .MuiMenuItem-root:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            color: '#FF6596',
                          },
                        },
                      },
                  }}
                  sx={{
                    width: '100%',
                  }}
                >
                  {categories.map((category) => {
                    return (
                      category.type === 'EXPENSE' && <MenuItem key={`category-${new Date().getTime()}-${Math.random()}`} value={category.name}
                                sx={{ background: 'transparent' }}>{category.name}</MenuItem>
                    );
                  })
                  }
                </Select>
              </Grid>
            }
            <Grid item sm={12} xs={12} md={6} sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
              <TextField
                id='amount'
                name='amount'
                placeholder={'0.00'}
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount} variant='standard'
                sx={{ '& .MuiInput-input': { paddingX: 0, textAlign: 'center' } }} />
            </Grid>
            <Grid item sm={12} xs={12} md={6} sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
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
                  sx={{ width: '100%' }}
                  OpenPickerButtonProps={{ sx: { color: theme => theme.palette.secondary.dark } }}
                  onChange={newValue => formik.setFieldValue('date', newValue)}
                  renderInput={(params) => <TextField {...params} id='dateField' variant='standard' />} />
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
  }
;

export default ModalAddTransaction;