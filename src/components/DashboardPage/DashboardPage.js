import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';

function DashboardPage() {
  return (
    <div className={style.DashboardWrap}>
      <Header />
      <div className={`${style.LeftHeadContainer} container`}>
        <div className={style.LeftContainer}>
          <Navigation />
          <Balance />
        </div>
        <div className={style.RightContainer}></div>
      </div>
    </div>
  );
}

export default DashboardPage;
