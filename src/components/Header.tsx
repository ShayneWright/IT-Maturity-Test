import {ShieldCheck} from 'lucide-react';
export function Header({compact=false}:{compact?:boolean}){return <header className={compact?'header compact':'header'}><a className="brand" href="/" aria-label="My IT Support home"><span className="brand-mark"><ShieldCheck/></span><span>MY IT <b>SUPPORT</b></span></a><span className="header-label">Cybersecurity Readiness</span></header>}
