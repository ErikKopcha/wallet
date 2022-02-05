import style from './Currency.module.css';
import React, { useState, useEffect } from 'react';
import useWalletService from '../../services/walletService';
import { Rings } from 'react-loader-spinner';
import { numberWithSpaces } from '../../helpers/helpers';

/**
 * @param { Number } currCode
 * @param { Number } buy
 * @param { Number } sale
 * @param { Number } precision
 * @returns {JSX.Element}
 */
const getRow = ({
    ccy = 'UAH',
    base_ccy = 'UAH',
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
  const [loadedData, setLoadedData] = useState(false);
  let getDataInterval = null;

  const diffMs = 3_600_000; // 1h
  const currDataDefault = [
    {ccy: 'EUR', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'RUR', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'USD', base_ccy: 'UAH', buy: '0', sale: '0'},
    {ccy: 'BTC', base_ccy: 'USD', buy: '0', sale: '0'}
  ];

  const {getCurrency} = useWalletService();

  /**
   * @param { Array } item
   */
  const setLocalStorageData = (item) => {
    window.localStorage.setItem('currDate', JSON.stringify(new Date()));
    window.localStorage.setItem('currData', JSON.stringify(item));
  };

  /**
   * get currency data from localStorage
   * @returns {string}
   */
  const getCurrFromStorage = () => {
    return window.localStorage.getItem('currData');
  };

  /**
   * get currency date (last get data)
   * @returns {string}
   */
  const getStorageCurrDate = () => {
    return window.localStorage.getItem('currDate');
  };

  /**
   * return diff (get curr data from api)
   * @returns {boolean}
   */
  const isGetData = () => {
    const date = getStorageCurrDate() || JSON.stringify(new Date(1980, 1, 1));
    const dateLocal = new Date(JSON.parse(date));

    if (!dateLocal) return true;

    const dateNow = new Date();

    if (dateNow < dateLocal) {
      dateNow.setDate(dateNow.getDate() + 1);
    }

    const diff = (dateNow.getTime() - dateLocal.getTime());

    return diff > diffMs;
  };

  /**
   * start function if data loaded
   * @param { Array } currData
   */
  const onDataLoaded = (currData) => {
    if (currData && currData.length) {
      setLocalStorageData(currData);
      setCurrData(currData);
    } else {
      setCurrData(currDataDefault);
      setLocalStorageData(currDataDefault);
    }

    setIsLoading(false);
  }

  /**
   * start check
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = () => {
    const isGetCurrency = isGetData();

    if (isGetCurrency) {
      setLoadedData(true);
      getCurrency().then(onDataLoaded);
    } else {
      const data = getCurrFromStorage() || "[]";
      const parsed = JSON.parse(data);

      onDataLoaded(parsed);
    }
  };

  /**
   * start check time to get data currency
   */
  const startCheckTime = () => {
    getDataInterval = setInterval(() => {
      const isGetCurrency = isGetData();

      if (isGetCurrency) {
        setCurrData([]);
        setIsLoading(true);
        getCurrency().then(onDataLoaded);
      }
    }, 10000);
  };

  useEffect(() => {
    if (!loadedData) {
      setLoadedData(true);
      setIsLoading(true);

      getData();
      startCheckTime();
    }
  }, [getData, startCheckTime, getDataInterval, loadedData]);

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
