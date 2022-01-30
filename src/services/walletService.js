import {useHttp} from '../hooks/http.hook';

const useWalletService = () => {
  const {request, isLoading} = useHttp();

  const _apiPrivate = 'https://api.privatbank.ua/p24api/pubinfo';
  const _baseCurrencyId = 11;

  const getCurrency = async () => {
    const res = await request(`${_apiPrivate}?exchange&json&coursid=${_baseCurrencyId}`);
    return res;
  };

  return {
    request,
    isLoading,
    getCurrency,
  }
}

export default useWalletService;