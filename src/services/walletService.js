import useFetch from 'use-http';
import { toast } from 'react-toastify';

const useCurrencyService = () => {
  const { get, response } = useFetch('https://api.privatbank.ua/p24api/pubinfo');
  const _baseCurrencyId = 5;

  const getCurrency = async () => {
    const result = await get(`?json&exchange&coursid=${_baseCurrencyId}`);

    if (response.ok) {
      return result;
    } else {
      toast.error(`Failed to load exchange rates.`, {
        theme: "colored"
      });

      return [];
    }
  };

  return { getCurrency };
};

export default useCurrencyService;
