import style from './Header.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import exitIcon from '../../assets/icons/exit.svg';

const name = 'Name';

function Header() {
  return (
    <div className={style.Header}>
      <div className={`${style.HeaderContainer} container`}>
        <a href="/" className={style.LogoWrap}>
          <img width="40" height="40" className={style.LogoImage} src={logo} alt="wallet logo" />
          <span className={style.LogoText}>Wallet</span>
        </a>
        <div className={style.HeaderInfo}>
          <p className={style.AfterVerticalLine}>{name}</p>
          <button className={style.BtnExit}>
            <img src={exitIcon} alt='logout' />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;