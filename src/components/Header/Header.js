import style from './Header.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import exitIcon from '../../assets/icons/exit.svg';

const name = 'Name';

function Header() {
  return (
    <div className={style.header}>
      <div className={`${style.headerContainer} container`}>
        <a href="/" className={style.logoWrap}>
          <img width="40" height="40" className={style.logoImage} src={logo} alt="wallet logo" />
          <span className={style.logoText}>Wallet</span>
        </a>
        <div className={style.headerInfo}>
          <p className={style.afterVerticalLine}>{name}</p>
          <button className={style.btnExit}>
            <img src={exitIcon} alt='logout' />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;