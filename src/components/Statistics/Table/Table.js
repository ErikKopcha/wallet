import styled from '../Statistics.module.css';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

const Table = props => {
  const { categories, colors, categoriesName } = props;
  const { expenses, income } = categories;

  const renderCategories = () => {
    const array = Object.entries(expenses);
    return array.map(el => {
      return (
        <li key={uuidv4()} className={styled.tableItem}>
          {' '}
          <div
            className={styled.itemBox}
            style={{ backgroundColor: colors[array.indexOf(el)] }}
          ></div>{' '}
          <p className={styled.itemName}>
            {categoriesName.find(cat => cat.id === el[0]).name}
          </p>{' '}
          <p className={styled.itemAmount}>{Math.abs(el[1])}</p>
        </li>
      );
    });
  };

  return (
    <>
      <ul className={styled.table}>{renderCategories()}</ul>
      <p className={styled.expenses}>
        Expenses:
        <span className={styled.expensesValue}>
          {Math.abs(Object.values(expenses).reduce((acc, num) => acc + num, 0))}
        </span>
      </p>
      <p className={styled.incomes}>
        Incomes:<span className={styled.incomesValue}>{income}</span>
      </p>
    </>
  );
};
const mapStateToProps = state => ({
  categoriesName: state.categories,
});

export default connect(mapStateToProps)(Table);
