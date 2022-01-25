import style from './Navigation.module.css';
import { Link, useLocation } from 'react-router-dom';

const navigationData = [
  {
    name: 'Main',
    linkClass: `${style.navigationLink}`,
    iconClass: style.mainLink,
    path: '/home',
    id: 1
  },
  {
    name: 'Statistic',
    linkClass: style.navigationLink,
    iconClass: style.statisticLink,
    path: '/home/statistic',
    id: 2
  },
  {
    name: 'Currency',
    linkClass: `${style.navigationLink} ${style.currencyLinkWrap}`,
    iconClass: style.currencyLink,
    path: '/home/currency',
    id: 3
  },
];

function getLink({ name, linkClass, iconClass, path, id }, checkLink) {
  return (
    <Link to={path} key={id} className={`${linkClass} ${checkLink(path) ? style.active : ``}`}>
      <i className={iconClass} />
      <span>{name}</span>
    </Link>
  );
}

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={style.navigation}>
      {navigationData.map(el => {
        return getLink(el, isActive)
      })}
    </nav>
  );
}

export default Navigation;