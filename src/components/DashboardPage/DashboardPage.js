import style from './DashboardPage.module.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function DashboardPage() {
  return (
    <div className={style.DashboardWrap}>
      <Header />
      <div className="container">
        <div>
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
