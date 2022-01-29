import style from './Header.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { Link } from "react-router-dom";
import { useState } from 'react';
import ModalLogout from '../ModalLogout/ModalLogout';

const name = 'Name';

const Header = () => {
  const [isModalLogoutOpen, setModalLogoutOpen] = useState(false);
  const handleOpenModalLogout = () => setModalLogoutOpen(true);
  const handleCloseModalLogout = () => setModalLogoutOpen(false);

  return (
    <div className={style.header}>
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
          <ModalLogout isOpen={isModalLogoutOpen} onClose={handleCloseModalLogout}/>
        </div>
      </div>
    </div>
  );
}

export default Header;