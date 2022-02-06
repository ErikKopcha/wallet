import style from './Currency.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import useWalletService from '../../services/walletService';
import { Rings } from 'react-loader-spinner';
import { numberWithSpaces } from '../../helpers/helpers';
import currencyHelpers from './helpers';

const {
  setLocalStorageCurrData,
  setDateToLocalStorage,
  getCurrFromStorage,
  isGetData
} = currencyHelpers();

/**
 * @param { Number } currCode
 * @param { Number } buy
 * @param { Number } sale
 * @param { Number } precision
 * @returns {JSX.Element}
 */
const getRow = ({
    ccy = 'UAH',
    buy = 1,
    sale = 1,
    precision = 2,
  }) => {
  return (
    <tr key={ccy}>
      <td>{ccy}</td>
      <td>{numberWithSpaces(Number(buy).toFixed(precision))}</td>
      <td className="ta-r">{numberWithSpaces(Number(sale).toFixed(precision))}</td>
    </tr>
  )
}

/**
 * @param { Array } currData
 * @returns {JSX.Element}
 */
const Table = ({currData}) => {
  return (
    <table>
      <thead>
      <tr>
        <th className="ta-l">Currency</th>
        <th className="ta-l">Purchase</th>
        <th className="ta-r">Sale</th>
      </tr>
      </thead>
      <tbody>
      {currData.map(getRow)}
      </tbody>
    </table>
  )
}

const Currency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currData, setCurrData] = useState([]);

  const msCheckUpdateData = 10_000;

  const currDataDefault = [
    {ccy: 'EUR', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'RUR', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'USD', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'BTC', base_ccy: 'USD', buy: '0', sale: '0'}
  ];
  let getDataInterval = null;

  const { getCurrency } = useWalletService();

  /**
   * start function if data loaded
   * @param { Array } currData
   */
  const onDataLoaded = (currData) => {
    if (currData && currData.length) {
      setLocalStorageCurrData(currData);
      setCurrData(currData);
    } else {
      setCurrData(currDataDefault);
      setLocalStorageCurrData(currDataDefault);
    }

    setIsLoading(false);
  }

  /**
   * start check time to get data currency
  */
  const startCheckTime = () => {
    if (getDataInterval) clearInterval(getDataInterval);

    getDataInterval = setInterval(() => {
      const isGetCurrency = isGetData();

      if (isGetCurrency) {
        setCurrData([]);
        setIsLoading(true);
        setDateToLocalStorage();
        getCurrency().then(onDataLoaded);
      }
    }, msCheckUpdateData);
  };

  /**
   * start check
   */
  const getData = useCallback(
    () => {
      setIsLoading(true);
      const isGetCurrency = isGetData();

      if (isGetCurrency) {
        getCurrency().then(onDataLoaded);
        setDateToLocalStorage();
      } else {
        const data = getCurrFromStorage() || "[]";
        const parsed = JSON.parse(data);

        onDataLoaded(parsed);
      }

      startCheckTime();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const isWaiting = isLoading ? <Rings wrapperClass={style.spinner} ariaLabel="loading-indicator" /> : null;
  const isRender = currData !== null && currData.length ? <Table currData={currData} /> : null;

  return (
    <div className={style.currency}>
      {isWaiting}
      {isRender}
    </div>
  )
}

export default Currency;
