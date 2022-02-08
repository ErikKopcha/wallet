import style from './DashboardPage.module.css';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import ButtonAddTransaction from '../../components/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import Currency from '../../components/Currency/Currency';
import Statistics from '../../components/Statistics/Statistics.js'
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import DashTable from '../../components/DashTable/DashTable';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import useTransactionsService from '../../services/transactionsService';
import MobileDahTable from '../../components/DashTable/MobileDashTable/MobileDashTable';

const DashboardPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 520px)'});

  const { getCategories, getTransactions } = useTransactionsService();

  useEffect(() => {
    getCategories();
    getTransactions();
    //eslint-disable-next-line
  }, [])

  return (
    <div className={style.dashboardWrap}>
      <Header />
      <div className={`${style.leftHeadContainer} container`}>
        <div className={style.leftContainer}>
         <div className={style.balanceBlock}>
           <Navigation />
           <Balance />
         </div>
          { !isMobile && <ErrorBoundary><Currency /></ErrorBoundary> }
        </div>
        <div className={style.rightContainer}>
          <Routes>
            <Route path="/" element={ isTabletOrMobile ? <MobileDahTable/> : <DashTable/> } />
            <Route path="diagram" element={ <Statistics/> } />
            { isMobile && <Route path="currency" element={ <ErrorBoundary><Currency /></ErrorBoundary> } /> }
          </Routes>
        </div>
        <Routes>
          <Route path="/" element={ isTabletOrMobile ? <ButtonAddTransaction right='20px' bottom='20px' /> :  <ButtonAddTransaction right='80px' bottom='60px' />}/>
        </Routes>
        <ModalAddTransaction />
      </div>
    </div>
  );
}

export default DashboardPage;
