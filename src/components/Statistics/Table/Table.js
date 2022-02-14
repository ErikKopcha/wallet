import styled from '../Statistics.module.css';
import { v4 as uuidv4 } from 'uuid';
import {numberWithSpaces} from '../../../helpers/helpers.js'
const Table = props => {
  const {
    categoriesAll: { categoriesSummary, expenseSummary, incomeSummary },
    colors,
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
          <p className={styled.itemAmount}>{numberWithSpaces(Math.abs(el.total))}</p>
        </li>
      );
    });
  };

  return (
    <>
      {categoriesSummary.length > 0 ? (
        <>
          <ul className={styled.table}>{renderCategories()}</ul>
          <p className={styled.expenses}>
            Expenses:
            <span className={styled.expensesValue}>
              {numberWithSpaces(Math.abs(expenseSummary))}
            </span>
          </p>
          <p className={styled.incomes}>
            Incomes:<span className={styled.incomesValue}>{numberWithSpaces(Math.abs(incomeSummary))}</span>
          </p>
        </>
      ) : (
        <p className={styled.noTrans}>At this month not transactions yet.</p>
      )}
    </>
  );
};

export default Table;
