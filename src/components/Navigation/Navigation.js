import style from './Navigation.module.css';

const navigationData = [
  {
    name: 'Main',
    linkClass: `${style.navigationLink} ${style.active}`,
    iconClass: style.mainLink,
    path: '/',
    id: 1
  },
  {
    name: 'Statistic',
    linkClass: style.navigationLink,
    iconClass: style.statisticLink,
    path: '/',
    id: 2
  },
  {
    name: 'Currency',
    linkClass: `${style.navigationLink} ${style.currencyLinkWrap}`,
    iconClass: style.currencyLink,
    path: '/',
    id: 3
  },
];

function getLink({ name, linkClass, iconClass, path, id }) {
  return (
    <a key={id} className={linkClass} href={path}>
      <i className={iconClass} />
      <span>{name}</span>
    </a>
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