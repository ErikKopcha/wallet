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
import { useEffect, useState } from 'react';
import DashTable from '../../components/DashTable/DashTable';
import Media from 'react-media';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import useTransactionsService from '../../services/transactionsService';

const DashboardPage = () => {
  const [isOpenModalTransaction, setModalTransaction] = useState(false);
  const handleOpenModalTransaction = () => setModalTransaction(true);
  const handleCloseModalTransaction = () => setModalTransaction(false);
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

  const { getCategories } = useTransactionsService();

  useEffect(() => {
    getCategories()
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
            <Route path="/" element={ <DashTable/> } />
            <Route path="diagram" element={ <Statistics/> } />
            { isMobile && <Route path="currency" element={ <ErrorBoundary><Currency /></ErrorBoundary> } /> }
          </Routes>
        </div>
        <Media query='(min-width: 720px)'>
          {
            matches => matches ? (
              <ButtonAddTransaction open={handleOpenModalTransaction} right='80px' bottom='60px' />
            ) : (
              <ButtonAddTransaction open={handleOpenModalTransaction} right='20px' bottom='20px' />
            )
          }
        </Media>
        <ModalAddTransaction isOpen={isOpenModalTransaction} onClose={handleCloseModalTransaction} />
      </div>
    </div>
  );
}

export default DashboardPage;
