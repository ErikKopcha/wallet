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

  const {getCurrency} = useWalletService();

  useEffect(() => {
    getCurrency().then(onDataLoaded);
  });

  const onDataLoaded = (currData) => {
    console.log('Currency => onDataLoaded: ', currData);
    if (currData) {
      setCurrData(currData);
    } else {
      const timeout = setTimeout(() => {
        setCurrData([
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
        ]);

        setLoading(false)

        clearTimeout(timeout);
      }, 4000)
    }
  }

  const isLoading = loading ? <Rings wrapperClass={style.spinner} ariaLabel="loading-indicator" /> : null;
  const isRender = currData !== null ? <Table currData={currData} /> : null;

  return (
    <div className={style.currency}>
      {isLoading}
      {isRender}
    </div>
  )
}

export default Currency;