import { Link, Route, Routes } from 'react-router-dom';
import { Button, Modal, Paper, Stack, Typography } from '@mui/material';
import RegistrationPage from '../RegistrationPage/RegistrationPage';

const ModalLogout = ({isOpen, onClose}) => {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Paper sx={{maxWidth: '450px', backgroundColor: '#fff', margin: '0 auto', mt: '150px', padding: '55px'}}>
        <Typography variant='h1' sx={{textAlign: 'center'}}>Are you sure you want to exit?</Typography>
        <Stack direction="row" spacing={2} justifyContent='center' sx={{mt: '30px'}}>
          <Link to='/register'>
            <Button variant='outlined' sx={{maxWidth: '200px'}}>Exit</Button>
          </Link>
          <Button variant='contained' onClick={onClose} sx={{maxWidth: '200px'}}>Cancel</Button>
          <Routes>
            <Route path="/register" element={ <RegistrationPage /> } />
          </Routes>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default ModalLogout;