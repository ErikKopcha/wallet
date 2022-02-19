import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';
import useUserService from 'services/userService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

import style from 'components/LoginForm/LoginForm.module.css';
import logo from 'assets/icons/wallet-logo.svg';

function LoginForm() {
  const { loginUser } = useUserService();

  function handleSubmit(values) {
    const user = {
      email: values.email,
      password: values.password
    }
    loginUser(user);
  }
  const validations = yup.object().shape({
    email: yup
      .string()
      .email('*Please enter a valid email')
      .required('*Required field'),
    password: yup
      .string()
      .required('*Required field')
      .min(6, '*Password is too short - should be 6 chars minimum')
      .max(12, '*Password is too long - should be 12 chars maximum'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={style.FormBox}>
            <div>
              <a href="/" className={style.LogoWrapper}>
                <img className={style.LogoImg} src={logo} alt="wallet logo" />
                <span className={style.LogoText}>Wallet</span>
              </a>
            </div>
            <form className={style.LogInForm}>
              <Input
                className={style.LogInInput}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="E-mail"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
              />
              {touched.email && errors.email && <p className={style.Error}>{errors.email}</p>}
              <Input
                className={style.LogInInput}
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='Password'
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && <p className={style.Error}>{errors.password}</p>}
              <button
                className={`${style.LogInBtn} ${style.Btn}`}
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type='submit'>
                Log in
              </button>
              <Link className={`${style.RegBtn} ${style.Btn}`} to="/register">
                Registration
              </Link>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default LoginForm;
