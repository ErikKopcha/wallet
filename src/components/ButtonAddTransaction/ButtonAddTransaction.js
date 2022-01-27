import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ButtonAddTransaction({open, right, bottom}) {
  return (
    <Fab onClick={open} size='44px' color='primary' aria-label='add'
         style={{ position: 'fixed', zIndex: 99, right: right, bottom: bottom }}>
      <AddIcon sx={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }} />
    </Fab>
)}

export default ButtonAddTransaction;