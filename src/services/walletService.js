import useFetch from 'use-http';
import { toast } from 'react-toastify';
import { loadingStarted, loadingFinished } from 'redux/global';
import { useDispatch } from 'react-redux';

const useWalletService = () => {
  const dispatch = useDispatch();
  const { get, response } = useFetch(
    'https://api.privatbank.ua/p24api/pubinfo',
  );
  const _baseCurrencyId = 5;

  /**
   * get currency data
   * @returns {Promise<*[]|any>}
   */
  const getCurrency = async () => {
    dispatch(loadingStarted());
    const result = await get(`?json&exchange&coursid=${_baseCurrencyId}`);
    dispatch(loadingFinished());

    if (response.ok) {
      return result;
    } else {
      toast.error(`Failed to load exchange rates.`, {
        theme: 'colored',
      });

      return [];
    }
  };

  return { getCurrency };
};

export default useWalletService;
