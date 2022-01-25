import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';

function DashboardPage() {
  return (
    <div className={style.dashboardWrap}>
      <Header />
      <div className={`${style.leftHeadContainer} container`}>
        <div className={style.leftContainer}>
         <div>
           <Navigation />
           <Balance />
         </div>
          <Currency />
        </div>
        <div className={style.rightContainer}></div>
      </div>
    </div>
  );
}

export default DashboardPage;
