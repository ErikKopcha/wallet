import style from './Header.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { Link } from "react-router-dom";

const name = 'Name';

function Header() {
  return (
    <div className={style.header}>
      <div className={`${style.headerContainer} container`}>
        <Link to="/" className={style.logoWrap}>
          <img width="40" height="40" className={style.logoImage} src={logo} alt="wallet logo" />
          <span className={style.logoText}>Wallet</span>
        </Link>
        <div className={style.headerInfo}>
          <p className={style.afterVerticalLine}>{name}</p>
          <Link to="/" className={style.btnExit}>
            <img src={exitIcon} alt='logout' />
            <span>Exit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;