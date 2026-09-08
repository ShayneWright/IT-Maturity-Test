import type { Category, Question } from '../types';
export const categories: Record<Category,{label:string;short:string;description:string;recommendation:string}> = {
 leadership:{label:'Leadership & Planning',short:'Leadership',description:'Clear ownership and plans help your team make good decisions before pressure is high.',recommendation:'Assign a security owner and document a simple incident plan with names, decisions, and contact details.'},
 assets:{label:'Know What You Have',short:'Visibility',description:'You can only protect the devices, services, and information you know about.',recommendation:'Create and maintain a simple inventory of devices, cloud services, owners, and sensitive information.'},
 protect:{label:'Protect Your Business',short:'Protection',description:'Everyday safeguards reduce the chance that a stolen password or unsafe device becomes a crisis.',recommendation:'Require two-step verification for all staff accounts, starting with administrators and email.'},
 detect:{label:'Spot Problems Early',short:'Detection',description:'Earlier warning gives you more time to contain an issue and limit disruption.',recommendation:'Route security alerts to a responsible person and review them consistently, including after hours.'},
 respond:{label:'Respond to Incidents',short:'Response',description:'A practiced response reduces confusion, downtime, and avoidable business impact.',recommendation:'Run a short tabletop exercise and confirm who can isolate systems and contact outside experts.'},
 recover:{label:'Recover & Continue',short:'Recovery',description:'Reliable, tested recovery protects operations when prevention is not enough.',recommendation:'Keep a protected backup copy and test a real restore of critical business data every quarter.'}
};
const q=(id:string,category:Category,text:string,help?:string,weight=1):Question=>({id,category,text,help,weight});
export const coreQuestions:Question[]=[
 q('owner','leadership','Is one person clearly responsible for keeping cybersecurity on the business agenda?'),
 q('policies','leadership','Are practical security expectations written down and shared with employees?'),
 q('insurance','leadership','Do you have cyber insurance and understand what you must do for coverage to apply?'),
 q('access_changes','leadership','Is access consistently added, changed, and removed when people join, change roles, or leave?',undefined,1.2),
 q('response_plan','leadership','Does your business have a written plan for handling a cyber incident?',undefined,1.2),
 q('training','leadership','Do employees receive security awareness training at least once a year?'),
 q('devices','assets','Do you have a current list of company computers, phones, and other connected devices?'),
 q('services','assets','Do you know which software and online services are essential to running the business?'),
 q('sensitive','assets','Do you know where confidential customer, employee, or business information is stored?'),
 q('vulnerability','assets','Are company devices regularly checked for missing updates and known weaknesses?'),
 q('external','assets','Are internet-facing systems and services periodically checked for unintended exposure?'),
 q('mfa','protect','Do staff need a second form of verification, such as an app or security code, when signing in?',undefined,1.3),
 q('admin_mfa','protect','Do administrators use separate, strongly protected accounts for making important changes?',undefined,1.2),
 q('passwords','protect','Does your team use a secure password manager and avoid reusing passwords?'),
 q('updates','protect','Are security updates installed automatically on computers, phones, and business software?'),
 q('endpoint','protect','Are company computers monitored for suspicious activity, not just traditional viruses?',undefined,1.2),
 q('email','protect','Does your email service filter suspicious messages and warn people about unsafe links?'),
 q('devices_managed','protect','Can lost or stolen company devices be locked or wiped?'),
 q('encryption','protect','Is business information protected if a laptop or phone is lost or stolen?'),
 q('phishing','protect','Does your business run occasional practice phishing exercises?'),
 q('alerts','detect','Would someone be alerted quickly if an account or device showed suspicious activity?',undefined,1.2),
 q('review','detect','Are security alerts reviewed in one place by a person responsible for acting on them?'),
 q('breach','detect','Are you notified if company email addresses or passwords appear in a known data breach?'),
 q('ongoing_checks','detect','Are checks for new security weaknesses repeated throughout the year?'),
 q('process','respond','Would employees know how and where to report a suspected cyber incident?'),
 q('response_owner','respond','Are the people responsible for decisions during an incident clearly named?'),
 q('isolate','respond','Can your team quickly disconnect an affected computer or account without shutting down everything?'),
 q('experts','respond','Do you have current contact details for outside technical, insurance, legal, and communications help?'),
 q('notifications','respond','Has the business identified who may need to be told after an incident?'),
 q('backups','recover','Is important business data backed up automatically?'),
 q('offsite','recover','Is at least one backup kept separately from your everyday systems?'),
 q('immutable','recover','Is there a backup copy that an attacker cannot easily change or delete?',undefined,1.2),
 q('restore','recover','Has your team successfully restored real files or systems from backup in the last year?',undefined,1.2),
 q('continuity','recover','Is there a practical plan for continuing critical work during a prolonged technology outage?')
];
export const industryQuestions:Question[]=[
 {id:'health_data',category:'protect',text:'Is patient information protected and accessible only to people who need it?',industries:['Healthcare']},
 {id:'health_duties',category:'leadership',text:'Do relevant team members understand their security responsibilities when handling patient information?',industries:['Healthcare']},
 {id:'finance_data',category:'protect',text:'Are sensitive financial and customer records protected with stronger access controls?',industries:['Financial Services','Accounting']},
 {id:'finance_rule',category:'leadership',text:'Has your business reviewed which data-security obligations apply, including the FTC Safeguards Rule where relevant?',industries:['Financial Services','Accounting']},
 {id:'legal_client',category:'protect',text:'Is confidential client information protected when staff work remotely?',industries:['Legal']},
 {id:'legal_depart',category:'leadership',text:'Is access to client matters promptly removed when an employee leaves?',industries:['Legal']},
 {id:'gov_data',category:'protect',text:'Do you know whether your business handles government-controlled or contract-sensitive information?',industries:['Government / Government Contractor']},
 {id:'gov_contract',category:'leadership',text:'Have you reviewed contractual security obligations, including CMMC or NIST 800-171 where relevant?',industries:['Government / Government Contractor']},
 {id:'payment',category:'protect',text:'If you accept card payments, are payment details handled only through an approved payment service?',industries:['Retail']}
];
export const questionsFor=(industry:string)=>[...coreQuestions,...industryQuestions.filter(x=>x.industries?.includes(industry))];
