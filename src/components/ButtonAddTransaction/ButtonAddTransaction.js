import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ButtonAddTransaction({open}) {
  return (
    <Fab onClick={open} size='44px' color='primary' aria-label='add'
         sx={{ position: 'absolute', right: '-70px', bottom: '-30px' }}>
      <AddIcon sx={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }} />
    </Fab>
)}

export default ButtonAddTransaction;