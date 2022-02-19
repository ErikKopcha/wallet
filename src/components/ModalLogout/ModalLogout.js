import { Link, Route, Routes } from 'react-router-dom';
import { Button, Modal, Paper, Stack, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModalLogout } from 'redux/global';

import LoginPage from 'pages/LoginPage/LoginPage';

const ModalLogout = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 420px)' });
  const dispatch = useDispatch();

  const isModalOpen = useSelector(state => state.global.isModalLogoutOpen);

  const onClose = () => {
    dispatch(closeModalLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      onClose();
      dispatch({type: 'USER_LOGOUT'});
      return <Link to='/login'/>;
    }
   catch (e) {
      toast.error(e.error.message, {
        theme: 'colored',
      });
      onClose();
   }
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form onSubmit={handleSubmit}>
        <Paper style={isMobile ? { width: '100%', height: '100%', marginTop: 0 } : null}
               sx={{ maxWidth: '450px', backgroundColor: '#fff', margin: '0 auto', mt: '150px', padding: '55px' }}>
          <Typography variant='h1' sx={{ textAlign: 'center' }}>Are you sure you want to exit?</Typography>
          <Stack style={isMobile ? { flexDirection: 'column' } : { flexDirection: 'row' }}
                 sx={{ mt: '30px', alignItems: 'center', justifyContent: 'center' }}>
              <Button type='submit' variant='outlined' style={isMobile ? { width: '300px', marginBottom: '20px' } : {
                width: '150px',
                marginRight: '20px',
              }}>Exit</Button>
            <Button variant='contained' onClick={onClose}
                    style={isMobile ? { width: '300px' } : { width: '150px' }}>Cancel</Button>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Stack>
        </Paper>
      </form>
    </Modal>
  );
};

export default ModalLogout;
