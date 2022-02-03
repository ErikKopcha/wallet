import style from './RegistrationForm.module.css';
import logo from '../../assets/icons/wallet-logo.svg';
import { Link } from "react-router-dom";
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useUserService from '../../services/userService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

export default function RegistrationForm() {
  const { registerUser } = useUserService();

  function handleSubmit(values) {
    const user = {
      username: values.name,
      email: values.email,
      password: values.password
    }
    registerUser(user);
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email('*Please enter a valid email').required('*Required field'),
    password: yup.string().required('*Required field').min(6, '*Password is too short - should be 6 chars minimum').max(12, '*Password is too long - should be 12 chars maximum'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], '*Password mismatch').required('*Required field'),
    name: yup.string().required('*Required field').min(1, '*Name should be 1 chars minimum').max(12, '*Name is too long - should be 12 chars maximum')
  })

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: ''
        }}
        validateOnBlur
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={style.Container}>
            <div>
              <a href='/' className={style.LogoWrap}>
                <img className={style.LogoImage} src={logo} alt='wallet logo'/>
                <span className={style.LogoText}>Wallet</span>
              </a>
            </div>
            <form className={style.RegForm}>
              <Input
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={style.RegInput}
                placeholder='E-mail'
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
              />
              {touched.email && errors.email && <p className={style.Error}>{errors.email}</p>}

              <Input
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={style.RegInput}
                placeholder='Password'
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && <p className={style.Error}>{errors.password}</p>}

              <Input
                type='password'
                name='confirmPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className={style.RegInput}
                placeholder='Confirm password'
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
                />
               {touched.confirmPassword && errors.confirmPassword && <p className={style.Error}>{errors.confirmPassword}</p>}
              
              <Input
                type='text'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={style.RegInput}
                placeholder='Your name'
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBoxIcon className={style.InputIcon}/>
                  </InputAdornment>
                }
                />
              {touched.name && errors.name && <p className={style.Error}>{errors.name}</p>}

              <button
                className={`${style.RegBtn} ${style.Btn}`}
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type='submit'>
                Registration
              </button>

              <Link className={`${style.LogInBtn} ${style.Btn}`} to="/login">Log in</Link>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}
