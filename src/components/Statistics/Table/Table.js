import styled from 'components/Statistics/Statistics.module.css';
import uniqid from 'uniqid';
import { numberWithSpaces } from 'helpers/helpers.js';

const Table = props => {
  const {
    categoriesAll: { categoriesSummary, expenseSummary, incomeSummary },
    colors,
  } = props;

  const renderCategories = () => {
    return categoriesSummary.map(el => {
      return (
        <li key={uniqid()} className={styled.tableItem}>
          {' '}
          <div
            className={styled.itemBox}
            style={{ backgroundColor: colors[categoriesSummary.indexOf(el)] }}
          />
          {' '}
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
