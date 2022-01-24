import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';

function DashboardPage() {
  return (
    <div className={style.DashboardWrap}>
      <Header />
      <div className={`${style.LeftHeadContainer} container`}>
        <div className={style.LeftContainer}>
         <div>
           <Navigation />
           <Balance />
         </div>
          <Currency />
        </div>
        <div className={style.RightContainer}></div>
      </div>
    </div>
  );
}

export default DashboardPage;
