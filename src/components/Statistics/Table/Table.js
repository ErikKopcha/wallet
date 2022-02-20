import styled from '../Statistics.module.css';
import { v4 as uuidv4 } from 'uuid';
import {numberWithSpaces} from '../../../helpers/helpers.js'
import {bitcoinExchange} from '../../../helpers/helpers'
const Table = props => {
  const {
    categoriesAll: { categoriesSummary, expenseSummary, incomeSummary },
    colors,currentCoin
  } = props;

  const renderCategories = () => {
    return categoriesSummary.map(el => {
      return (
        <li key={uuidv4()} className={styled.tableItem}>
          {' '}
          <div
            className={styled.itemBox}
            style={{ backgroundColor: colors[categoriesSummary.indexOf(el)] }}
          ></div>{' '}
          <p className={styled.itemName}>{el.name}</p>{' '}
          <p className={styled.itemAmount}>{bitcoinExchange(el.total,currentCoin)}</p>
        </li>
      );
    });
  };

  return (
    <>
      {categoriesSummary.length > 0 || incomeSummary>0 ? (
        <>
          <ul className={styled.table}>{renderCategories()}</ul>
          <p className={styled.expenses}>
            Expenses:
            <span className={styled.expensesValue}>
              {numberWithSpaces(bitcoinExchange(expenseSummary,currentCoin))}
            </span>
          </p>
          <p className={styled.incomes}>
            Incomes:<span className={styled.incomesValue}>{bitcoinExchange(incomeSummary,currentCoin)}</span>
          </p>
        </>
      ) : (
        <p className={styled.noTrans}>At this month not transactions yet.</p>
      )}
    </>
  );
};

export default Table;
