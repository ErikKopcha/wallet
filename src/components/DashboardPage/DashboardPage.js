import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import ButtonAddTransaction from '../ButtonAddTransaction/ButtonAddTransaction';
import { useState } from 'react';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';

function DashboardPage() {

  const [modalAdd, setModalAdd] = useState(false)

  const handleOpenModalAdd = () => setModalAdd(true)
  const handleCloseModalAdd = () => setModalAdd(false)

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
      <ButtonAddTransaction open={handleOpenModalAdd} />
      {
        modalAdd && <ModalAddTransaction close={handleCloseModalAdd} />
      }
    </div>
  );
}

export default DashboardPage;
