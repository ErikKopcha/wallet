import useFetch from 'use-http';
import { authenticationSuccess } from '../features/session';
import { registration, authorization } from '../features/user';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const useUserService = () => {
  const { post, response } = useFetch('https://wallet.goit.ua/api');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _apiAuthSingup = 'auth/sign-up';
  const _apiAuthSignin = 'auth/sign-in';

  const registerUser = async (user) => {
    const result = await post(`${_apiAuthSingup}`, user);
    if (response.ok) {
      dispatch(registration(result.user));
      dispatch(authenticationSuccess({ token: result.token }));
      navigate('/');
    }
    else {
      toast.error(result.message, {
        theme: "colored"
      }
      );
    }
  }

  const authoriseUser = async (user) => {
    const result = await post(`${_apiAuthSignin}`, user);
    console.log(result.token);
    if (response.ok) {
      dispatch(authorization(result.user));
      dispatch(authenticationSuccess({ token: result.token }));
      localStorage.setItem('token', result.token);
      navigate('/');
    }
    else {
      toast.error(result.message, {
          theme: "colored"
        }
      );
    }
  }

  return {
    registerUser, authoriseUser
  }
}

export default useUserService;
