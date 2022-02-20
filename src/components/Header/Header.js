import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { openModalLogout } from 'redux/global';

import style from 'components/Header/Header.module.css';
import logo from 'assets/icons/wallet-logo.svg';
import exitIcon from 'assets/icons/exit.svg';
import ModalLogout from 'components/ModalLogout/ModalLogout';

const Header = () => {
  const user = useSelector((state) => state.user)

  const isMobile = useMediaQuery({ query: '(max-width: 435px)' });

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
          <div className={style.dropdown}>
            <p className={`${style.afterVerticalLine} ${style.dropEl}`}>{user.username}</p>
            <div className={style.dropdownContent}>
              <span>Name: <span className={style.contentVar}>{user.username}</span></span>
              <span>Email: <span className={style.contentVar}>{user.email}</span></span>
              <span>Balance: <span className={style.contentVar}>$ {user.balance}</span></span>
            </div>
          </div>
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
