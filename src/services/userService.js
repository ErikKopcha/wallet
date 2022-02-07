import useFetch from 'use-http';
import { authenticationSuccess } from '../features/session';
import { authorization, registration } from '../features/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const useUserService = () => {
  const { post, response } = useFetch('https://wallet.goit.ua/api');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _apiAuthSingup = 'auth/sign-up';
  const _apiAuthSingin = 'auth/sign-in';

  const registerUser = async (user) => {
    const result = await post(`${_apiAuthSingup}`, user);
    if (response.ok) {
      dispatch(registration(result.user));
      dispatch(authenticationSuccess({ token: result.token }));
      navigate('/');
    } else {
      toast.error(result.message, {
          theme: 'colored',
        },
      );
    }
  };

  const loginUser = async (user) => {
    const result = await post(`${_apiAuthSingin}`, user);
    if (response.ok) {
      dispatch(authorization(result.user));
      dispatch(authenticationSuccess({ token: result.token }));
      navigate('/');
    } else {
      toast.error(result.message, {
        theme: 'colored',
      });
    }
  };

  return {
    registerUser, loginUser,
  };
};

export default useUserService;
