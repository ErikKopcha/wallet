import styled from '../Statistics.module.css';
import { v4 as uuidv4 } from 'uuid';
import styles from './Table.module.css'
export default function Table (props){
const {categories,colors,month,year} = props;
const {expenses,income} = categories;


const renderCategories = () =>{
  const array = Object.entries(expenses)
return array.map((el)=>{

return (
  <li key={uuidv4()} className={styled.tableItem}>
            {' '}
            <div className={styled.itemBox} style={{backgroundColor: colors[array.indexOf(el)]}}></div>{' '}
            <p className={styled.itemName}>{el[0]}</p>{' '}
            <p className={styled.itemAmount}>{el[1]}</p>
          </li>
)

})
}

    return (
        <>
        {month && year ? (
          <>
        <ul className={styled.table}>

{renderCategories()}

        </ul>
        <p className={styled.expenses}>
          Expenses:<span className={styled.expensesValue}>{Object.values(expenses).reduce((acc, num) => acc + num, 0)}</span>
        </p>
        <p className={styled.incomes}>
    Incomes:<span className={styled.incomesValue}>{income}</span>
        </p>
        </> ):(<p className={styles.text}>Please,choose your date to start!</p>)}
        </>
    )

}