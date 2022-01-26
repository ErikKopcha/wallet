import style from './RegistrationPage.module.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ellipse1 from '../../assets/images/ellipse-1.svg';
import ellipse2 from '../../assets/images/ellipse-2.svg';
import regpageimg from '../../assets/images/regpagebig.png'

export default function RegistrationPage() {
  return (
    <div className={style.RegPage}>
      <div className={style.Ellipse1}>
        <img src={ellipse1} alt="ellipse" />
      </div>
      <div className={style.Ellipse2}>
        <img src={ellipse2} alt="ellipse" />
      </div>

      <div className={style.RegPageWrapper}>
        <div className={style.ImgSide}>
          <img src={regpageimg} className={style.RegImage} alt="phone" />
          <h1>Finance App</h1>
        </div>

        <div className={style.FormSide}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}

