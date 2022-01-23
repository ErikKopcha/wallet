import style from './Balance.module.css';

const balanceInfo = {
  sum: `24 000.00`,
  currCode: `₴`
};

function Balance() {
  return (
    <div className={style.Balance}>
      <p className={style.BalanceTitle}>Your balance</p>
      <p className={style.BalanceSum}>
        <span className={style.BalanceCurrCode}>{balanceInfo.currCode}</span>&nbsp;{balanceInfo.sum}
      </p>
    </div>
  );
}

export default Balance;