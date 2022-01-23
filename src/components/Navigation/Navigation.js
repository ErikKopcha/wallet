import style from './Navigation.module.css';

const navigationData = [
  {
    name: 'Main',
    linkClass: `${style.NavigationLink} ${style.Active}`,
    iconClass: style.MainLink,
    path: '/'
  },
  {
    name: 'Statistic',
    linkClass: style.NavigationLink,
    iconClass: style.StatisticLink,
    path: '/'
  },
  {
    name: 'Currency',
    linkClass: `${style.NavigationLink} ${style.CurrencyLinkWrap}`,
    iconClass: style.CurrencyLink,
    path: '/'
  },
];

function getLink({ name, linkClass, iconClass, path }) {
  return (
    <a className={linkClass} href={path}>
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