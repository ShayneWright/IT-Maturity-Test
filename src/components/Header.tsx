import { MY_IT_SUPPORT_LOGO } from '../assets/logo';

export function Header({compact=false}:{compact?:boolean}) {
  return <header className={compact?'header compact':'header'}>
    <a className="brand" href="https://myitsupportusa.com/" aria-label="Visit the My IT Support website">
      <img src={MY_IT_SUPPORT_LOGO} alt="My IT Support" />
    </a>
    <span className="header-label">Cybersecurity Readiness</span>
  </header>;
}
