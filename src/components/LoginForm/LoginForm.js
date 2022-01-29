import style from './LoginForm.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import { Link } from "react-router-dom";


export default function RegistrationForm() {
  return (
    <div className={style.FormBox}>
      <div>
        <a href='/' className={style.LogoWrapper}>
          <img className={style.LogoImg} src={logo} alt='wallet logo'/>
          <span className={style.LogoText}>Wallet</span>
        </a>
      </div>
      <form className={style.LogInForm}>
        <input
          className={style.LogInInput}
          placeholder='E-mail'
          type='email'>
        </input>
        <input
          className={style.LogInInput}
          placeholder='Password'
          type='password'>
        </input>
        

        <Link className={`${style.RegBtn} ${style.Btn}`} to="/register">Registration</Link>
        <Link className={`${style.LogInBtn} ${style.Btn}`} to="/home/">Log in</Link>
      </form>
    </div>
  )
}
