import style from './LoginPage.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import ellipse1 from '../../assets/images/ellipse-1.svg';
import ellipse2 from '../../assets/images/ellipse-2.svg';
import LogInPageImg from '../../assets/images/LogInPageImg.png'

export default function RegistrationPage() {
  return (
    <div className={style.LogInPage}>
      <div className={style.Ellipse1}>
        <img src={ellipse1} alt="ellipse" />
      </div>
      <div className={style.Ellipse2}>
        <img src={ellipse2} alt="ellipse" />
      </div>

      <div className={style.LogInPageWrap}>
        <div className={style.ImgWrap}>
          <img src={LogInPageImg} className={style.LogInImage} alt="phone" />
          <h1>Finance App</h1>
        </div>

        <div className={style.FormBox}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

