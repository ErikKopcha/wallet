import {useHttp} from '../hooks/http.hook';

const useWalletService = () => {
  const {request} = useHttp();

  const _apiPrivate = 'https://api.privatbank.ua/p24api/pubinfo';
  const _baseCurrencyId = 5;

  const getCurrency = async () => {
    const res = await request(`${_apiPrivate}?json&exchange&coursid=${_baseCurrencyId}`);
    return res;
  }

  return {
    request,
    getCurrency
  }
}

export default useWalletService;