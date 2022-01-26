import style from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const navigationData = [
  {
    name: 'Main',
    linkClass: `${style.navigationLink}`,
    iconClass: style.mainLink,
    path: '/home/',
    id: 1
  },
  {
    name: 'Statistic',
    linkClass: style.navigationLink,
    iconClass: style.statisticLink,
    path: 'diagram',
    id: 2
  },
  {
    name: 'Currency',
    linkClass: `${style.navigationLink} ${style.currencyLinkWrap}`,
    iconClass: style.currencyLink,
    path: 'currency',
    id: 3
  },
];
//
function getLink({ name, linkClass, iconClass, path, id }) {
  const setActive = ({ isActive }) => (isActive ? `${linkClass} ${style.active}` : linkClass);

  return (
    <NavLink
      to={path}
      key={id}
      className={setActive}
    >
      <i className={iconClass} />
      <span>{name}</span>
    </NavLink>
  );
}

function Navigation() {
  return (
    <nav className={style.navigation}>
      {navigationData.map(getLink)}
    </nav>
  );
}

export default Navigation;