import style from './Currency.module.css';
import React, { useState, useEffect } from 'react';
import useWalletService from '../../services/walletService';
import { Rings } from 'react-loader-spinner';

/**
 * @param { Number } currCode
 * @param { Number } buy
 * @param { Number } sale
 * @param { Number } precision
 * @param { Number } id
 * @returns {JSX.Element}
 */
const getRow = ({
    currCode = 'UAH',
    buy = 1,
    sale = 1,
    precision = 2,
    id = 0
}) => {
  return (
    <tr key={id}>
      <td>{currCode}</td>
      <td>{buy.toFixed(precision)}</td>
      <td className="ta-r">{sale.toFixed(precision)}</td>
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
  const [currData, setCurrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const diffMs = 3_600_000; // 1h
  const currDataDefault = [
    {
      currCode: 'USD',
      buy: 0,
      sale: 0,
      precision: 2,
      id: 1
    },
    {
      currCode: 'EUR',
      buy: 0,
      sale: 0,
      precision: 2,
      id: 2
    },
    {
      currCode: 'PLN',
      buy: 0,
      sale: 0,
      precision: 2,
      id: 3
    },
    {
      currCode: 'CAD',
      buy: 0,
      sale: 0,
      precision: 2,
      id: 4
    },
    {
      currCode: 'GBP',
      buy: 0,
      sale: 0,
      precision: 2,
      id: 5
    },
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
   * start check
   */
  const getData = () => {
    const diffDate = getDiffTime();

    if (diffDate < diffMs) {
      const data = getCurrFromStorage() || "[]";
      const parsed = JSON.parse(data);

      if (parsed && parsed.length) {
        // ------------ for test ------------ //
        setTimeout(() => {
          setCurrData(parsed);
          setLoading(false);
        }, 4000);
      }
    } else {
      if (!currData.length) {
        getCurrency().then(onDataLoaded);
      }
    }
  };

  useEffect(() => {
    let cleanupFunction = false;

    getData();

    return () => cleanupFunction = true;
  }, []);

  /**
   * start function if data loaded
   * @param { Array } currData
   */
  const onDataLoaded = (currData) => {
    console.log('Currency => onDataLoaded: ', currData);

    if (currData && currData.length) {
      setLocalStorageData(currData);
      setCurrData(currData);
    } else {
      const timeout = setTimeout(() => {
        setCurrData(currDataDefault);
        setLocalStorageData(currDataDefault);

        setLoading(false)

        clearTimeout(timeout);
      }, 4000)
    }
  }

  const isLoading = loading ? <Rings wrapperClass={style.spinner} ariaLabel="loading-indicator" /> : null;
  const isRender = currData !== null && currData.length ? <Table currData={currData} /> : null;

  return (
    <div className={style.currency}>
      {isLoading}
      {isRender}
    </div>
  )
}

export default Currency;