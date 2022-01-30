import style from './Currency.module.css';
import React, { useState, useEffect, useCallback } from 'react';
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
  const [loadedData, setLoadedData] = useState(false)

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
   * @returns {number}
   */
  const getDiffTime = () => {
    const date = getStorageCurrDate() || JSON.stringify(new Date());
    const dateLocal = new Date(JSON.parse(date));

    if (!dateLocal) return 0;

    const dateNow = new Date();

    if (dateNow < dateLocal) {
      dateNow.setDate(dateNow.getDate() + 1);
    }

    return (dateNow - dateLocal);
  };

  /**
   * start function if data loaded
   * @param { Array } currData
   */
  const onDataLoaded = (currData) => {
    setIsLoading(false);
    setCurrData(currData);

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

  const getData = () => {
    const diffDate = getDiffTime();

    if (diffDate < diffMs) {
      const data = getCurrFromStorage() || "[]";
      const parsed = JSON.parse(data);

      if (parsed && parsed.length) {
        onDataLoaded(parsed)
      }
    } else {
      if (!currData.length) {
        getCurrency().then(onDataLoaded);
      }
    }

    setLoadedData(true);
  };

  useEffect(() => {
    if (loadedData) return;

    setIsLoading(true);
    getData();
  }, [])

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