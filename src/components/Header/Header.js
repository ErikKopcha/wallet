import style from './Header.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { Link } from "react-router-dom";
import ModalLogout from '../ModalLogout/ModalLogout';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { openModalLogout } from '../../features/global';

const Header = () => {
  const name = useSelector((state) => state.user.username)

  const isMobile = useMediaQuery({ query: '(max-width: 420px)' });

  const dispatch = useDispatch();

  const handleOpenModalLogout = () => {
    dispatch(openModalLogout());
  };

  return (
    <div className={style.header} style={isMobile ? {zIndex: 300} : {zIndex: 100}}>
      <div className={`${style.headerContainer} container`}>
        <Link to="/" className={style.logoWrap}>
          <img width="40" height="40" className={style.logoImage} src={logo} alt="wallet logo" />
          <span className={style.logoText}>Wallet</span>
        </Link>
        <div className={style.headerInfo}>
          <p className={style.afterVerticalLine}>{name}</p>
          <button className={style.btnExit} onClick={handleOpenModalLogout}>
            <img src={exitIcon} alt='logout' />
            <span>Exit</span>
          </button>
          <ModalLogout/>
        </div>
      </div>
    </div>
  );
}

export default Header;
