import useFetch from 'use-http';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

const useTransactionsService = () => {

  const {post, get, response} = useFetch('https://wallet.goit.ua/api');
  const dispatch = useDispatch();
  const _apiTransactions = 'transactions';
  const _apiCategories = 'transaction-categories';

  const addTransaction = async (transaction) => {
    const result = await post(`${_apiTransactions}`, transaction);
    if (response.ok) {
      dispatch(addTransaction(result));
    } else {
      toast.error(result.message, {
        theme: "colored"
      });
    }
  }

  const getCategories = async () => {
    const result = await get(`${_apiCategories}`);
    if (response.ok) {
      dispatch(getCategories(result));
    }
    // !response.ok && toast.error(result.message, {
    //   theme: 'colored'
    // });
  }

  return {addTransaction, getCategories}
}

export default useTransactionsService;

