import useFetch from 'use-http';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveCategories } from '../features/trans-categories';
import { saveTransaction } from '../features/transactions';

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

  const addTransaction = async (transaction) => {
    const result = await post(`${_apiTransactions}`, transaction);
    if (response.ok) {
      dispatch(saveTransaction(result));
    } else {
      toast.error(result.message, {
        theme: 'colored',
      });
    }
  };

  const getCategories = async () => {
    const result = await get(`${_apiCategories}`);
    if (response.ok) {
      dispatch(saveCategories(result));
    } else {
      toast.error('Sorry, we couldn\'t find categories' , {
        theme: 'colored',
      });
    }
  };

  return { addTransaction, getCategories };
};

export default useTransactionsService;

