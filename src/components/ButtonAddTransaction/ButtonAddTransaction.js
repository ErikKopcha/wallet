import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { openModalAddTransaction } from 'redux/global';

function ButtonAddTransaction({ right, bottom }) {

  const dispatch = useDispatch();

  const handleOpenModalAddTransaction = () => {
    dispatch(openModalAddTransaction());
  };

  return (
    <Fab onClick={handleOpenModalAddTransaction} size='44px' color='primary' aria-label='add'
         style={{ position: 'fixed', zIndex: 99, right: right, bottom: bottom }}>
      <AddIcon sx={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }} />
    </Fab>
  );
}

export default ButtonAddTransaction;