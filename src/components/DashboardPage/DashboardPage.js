import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import ButtonAddTransaction from '../ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import Currency from '../Currency/Currency';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import DashTable from '../DashTable/DashTable';

function DashboardPage() {
  const [isOpenModalTransaction, setModalTransaction] = useState(false);
  const handleOpenModalTransaction = () => setModalTransaction(true);
  const handleCloseModalTransaction = () => setModalTransaction(false);
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

  return (
    <div className={style.dashboardWrap}>
      <Header />
      <div className={`${style.leftHeadContainer} container`}>
        <div className={style.leftContainer}>
          <div>
            <Navigation />
            <Balance />
          </div>
          {!isMobile && <Currency />}
        </div>
        <div className={style.rightContainer}>
          <Routes>
            <Route path='/' element={<DashTable />} />
            <Route path='diagram' element={<h1>Char table</h1>} />
            {isMobile && <Route path='currency' element={<Currency />} />}
          </Routes>
        </div>
        <ButtonAddTransaction open={handleOpenModalTransaction} right='80px' bottom='60px' />
        <ModalAddTransaction isOpen={isOpenModalTransaction} onClose={handleCloseModalTransaction} />
      </div>
    </div>
  );
}

export default DashboardPage;
