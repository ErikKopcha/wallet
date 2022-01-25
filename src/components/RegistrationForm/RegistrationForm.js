import style from './RegistrationForm.module.css';
import logo from '../../assets/icons/wallet-logo.svg';

export default function RegistrationForm() {
  return (
    <div className={style.Container}>
      <div>
        <a href='/' className={style.LogoWrap}>
          <img className={style.LogoImage} src={logo} alt='wallet logo'/>
          <span className={style.LogoText}>Wallet</span>
        </a>
      </div>
      <form className={style.RegForm}>
        <input
          className={style.RegInput}
          placeholder='E-mail'
          type='email'>
        </input>
        <input
          className={style.RegInput}
          placeholder='Password'
          type='password'>
        </input>
        <input
          className={style.RegInput}
          placeholder='Confirm password'
          type='password'>
        </input>
        <input
          className={style.RegInput}
          placeholder='Your name'
          type='text'>
        </input>

        <button className={`${style.RegBtn} ${style.Btn}`}>
          Registration
        </button>
        <a className={`${style.LogInBtn} ${style.Btn}`}>
          Log in
        </a>
      </form>
    </div>
  )
}
