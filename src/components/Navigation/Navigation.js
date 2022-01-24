import style from './Navigation.module.css';

const navigationData = [
  {
    name: 'Main',
    linkClass: `${style.NavigationLink} ${style.Active}`,
    iconClass: style.MainLink,
    path: '/',
    id: 1
  },
  {
    name: 'Statistic',
    linkClass: style.NavigationLink,
    iconClass: style.StatisticLink,
    path: '/',
    id: 2
  },
  {
    name: 'Currency',
    linkClass: `${style.NavigationLink} ${style.CurrencyLinkWrap}`,
    iconClass: style.CurrencyLink,
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
    <nav className={style.Navigation}>
      {navigationData.map(getLink)}
    </nav>
  );
}

export default Navigation;