import { useSelector } from 'react-redux';

import style from 'components/Balance/Balance.module.css';
import { numberWithSpaces } from 'helpers/helpers';

const Balance = () => {
  const balance = useSelector(state => state.user.balance);

  const balanceInfo = {
    sum: Number(balance).toFixed(2),
    currCode: `$`,
  };

  return (
    <div className={style.balance}>
      <p className={style.balanceTitle}>Your balance</p>
      <p className={style.balanceSum}>
        <span className={style.balanceCurrCode}>{balanceInfo.currCode}</span>
        &nbsp;{numberWithSpaces(balanceInfo.sum)}
      </p>
    </div>
  );
};

export default Balance;
