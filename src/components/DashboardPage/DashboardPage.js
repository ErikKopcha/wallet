import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import ButtonAddTransaction from '../ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import Currency from '../Currency/Currency';

import { useState } from 'react';

function DashboardPage() {
  const [isOpenModalTransaction, setModalTransaction] = useState(false)
  const handleOpenModalTransaction = () => setModalTransaction(true)
  const handleCloseModalTransaction = () => setModalTransaction(false)

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
      <ButtonAddTransaction open={handleOpenModalTransaction} />
      <ModalAddTransaction isOpen={isOpenModalTransaction} onClose={handleCloseModalTransaction} />
    </div>
  );
}

export default DashboardPage;
