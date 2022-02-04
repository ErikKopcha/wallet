import {styled} from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const StyledSwitch = styled(Switch)(({theme}) => ({
  width: 80,
  height: 44,
  padding: 2,
  overflow: 'visible',
  transform: 'rotate(180deg)',
  '& .MuiSwitch-switchBase': {
    margin: 0,
    padding: 0,
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(36px)',
      '& .MuiSwitch-thumb':{
        backgroundColor: '#24CCA7',
        boxShadow: '0px -6px 15px rgba(36, 204, 167, 0.5)',
      },
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0V20" stroke="white" stroke-width="2"/><path d="M0 10L20 10" stroke="white" stroke-width="2"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#fff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#FF6596',
    width: 44,
    height: 44,
    boxShadow: '0px -6px 15px rgba(255, 101, 150, 0.5)',
    overflow: 'visible',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10L20 10" stroke="white" stroke-width="2"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    border: '1px solid #E0E0E0'
  },
}));

export default StyledSwitch;