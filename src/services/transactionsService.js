import useFetch from 'use-http';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveCategories, addTransaction, saveTransactions } from '../features/transactions';

const useTransactionsService = () => {

  const dispatch = useDispatch();
  const _apiTransactions = 'transactions';
  const _apiCategories = 'transaction-categories';
  const token = useSelector(state => state.session.authToken);

  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const { post, get, response } = useFetch('https://wallet.goit.ua/api', requestOptions);

  // const getTransactions = async () => {
  //   const result = await get(`${_apiTransactions}`);
  //   if (response.ok) {
  //     dispatch(saveTransactions(result));
  //   } else {
  //     toast.error(result.message, {
  //       theme: 'colored',
  //     });
  //   }
  // };

  const postTransaction = async (transaction) => {
    const result = await post(`${_apiTransactions}`, transaction);
    if (response.ok) {
      dispatch(addTransaction(result));
    } else {
      toast.error(result.message, {
        theme: 'colored',
      });
    }
  };

  // const getCategories = async () => {
  //   const result = await get(`${_apiCategories}`);
  //   if (response.ok) {
  //     dispatch(saveCategories(result));
  //   } else {
  //     toast.error('Sorry, we couldn\'t find categories', {
  //       theme: 'colored',
  //     });
  //   }
  // };

  return {  postTransaction };
};

export default useTransactionsService;

