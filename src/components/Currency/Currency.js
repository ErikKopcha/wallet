import style from './Currency.module.css';

const currData = [
  {
    currCode: 'USD',
    buy: 27.55,
    sale: 27.6,
    precision: 2,
    id: 1
  },
  {
    currCode: 'EUR',
    buy: 31.5,
    sale: 32.35,
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

function getRow({ currCode, buy, sale, precision, id }) {
  return (
    <tr key={id}>
      <td>{currCode}</td>
      <td>{buy.toFixed(precision)}</td>
      <td className="ta-r">{sale.toFixed(precision)}</td>
    </tr>
  )
}

function Currency() {
  return (
    <div className={style.currency}>
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
    </div>
  )
}

export default Currency;