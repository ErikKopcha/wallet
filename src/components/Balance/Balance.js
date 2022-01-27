import style from './Balance.module.css';

const balanceInfo = {
  sum: `24 000.00`,
  currCode: `₴`
};

const Balance = () => {
  return (
    <div className={style.balance}>
      <p className={style.balanceTitle}>Your balance</p>
      <p className={style.balanceSum}>
        <span className={style.balanceCurrCode}>{balanceInfo.currCode}</span>&nbsp;{balanceInfo.sum}
      </p>
    </div>
  );
}

export default Balance;