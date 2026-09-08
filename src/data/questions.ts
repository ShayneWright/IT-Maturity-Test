import type { Category, Question } from '../types';

export const categories: Record<Category, { label:string; short:string; description:string; recommendation:string }> = {
  leadership:{label:'Leadership & Planning',short:'Leadership',description:'Clear ownership and plans help your team make good decisions before pressure is high.',recommendation:'Assign a security owner and document simple, practical security expectations.'},
  assets:{label:'Know What You Have',short:'Visibility',description:'You can only protect the devices, services, and information you know about.',recommendation:'Create and maintain a simple inventory of devices, cloud services, owners, and sensitive information.'},
  protect:{label:'Protect Your Business',short:'Protection',description:'Everyday safeguards reduce the chance that a stolen password or unsafe device becomes a crisis.',recommendation:'Require two-step verification for all staff accounts, starting with administrators and email.'},
  detect:{label:'Spot Problems Early',short:'Detection',description:'Earlier warning gives you more time to contain an issue and limit disruption.',recommendation:'Route security alerts to a responsible person and review them consistently, including after hours.'},
  respond:{label:'Respond to Incidents',short:'Response',description:'A practiced response reduces confusion, downtime, and avoidable business impact.',recommendation:'Confirm who makes incident decisions, who can isolate systems, and who must be notified.'},
  recover:{label:'Recover & Continue',short:'Recovery',description:'Reliable, tested recovery protects operations when prevention is not enough.',recommendation:'Test a real restore of critical business data and review how essential work would continue during an outage.'}
};

const item=(id:string,order:number,category:Category,text:string,weight=1,help?:string,priority?:'standard'|'high'):Question=>({id,active:true,order,category,text,weight,help,priority});

/** Versioned product-owner-approved scored question configuration. */
export const assessmentItems: Question[] = [
  item('owner',1,'leadership','Someone is clearly responsible for keeping cybersecurity on the business agenda.'),
  item('policies',2,'leadership','Basic cybersecurity rules are written down and shared with employees.'),
  item('access_changes',3,'leadership','Employee access is consistently added, changed, and removed when people join, change roles, or leave.',1.2,undefined,'high'),
  item('training',4,'leadership','Employees receive cybersecurity awareness training at least once a year.'),
  item('devices',5,'assets','You have a current list of company computers, phones, and other connected devices.'),
  item('services',6,'assets','You know which software and online services are essential to running the business.'),
  item('sensitive',7,'assets','You know where confidential customer, employee, or business information is stored.'),
  item('mfa',8,'protect','Staff use two-step verification when signing in to important business accounts.',1.3,undefined,'high'),
  item('passwords',9,'protect','Your team uses a business password manager and avoids reusing passwords across accounts.'),
  item('updates',10,'protect','Security updates are installed automatically on company computers, phones, and business software.'),
  item('endpoint',11,'protect','Company computers use security software that can detect and respond to suspicious activity, not just known viruses.',1.2,'This means security software that can identify unusual or potentially harmful behavior and help stop it, rather than only matching known virus signatures.','high'),
  item('email',12,'protect','Your email service filters suspicious messages and warns users about unsafe links.'),
  item('devices_managed',13,'protect','Lost or stolen company laptops and phones can be remotely locked or wiped.'),
  item('encryption',14,'protect','Business information on company laptops and phones stays protected if a device is lost or stolen.',1,'This usually means the information on the device is encrypted so someone cannot simply access it if the device is lost or stolen.'),
  item('alerts',15,'detect','Someone is responsible for monitoring security alerts and acting quickly when suspicious account or device activity appears.',1.2,undefined,'high'),
  item('breach',16,'detect','Your business is notified if company email addresses or passwords appear in known data breaches.'),
  item('ongoing_checks',17,'detect','Checks for new security weaknesses are repeated throughout the year.'),
  item('process',18,'respond','Employees know how and where to report a suspected cyber incident.'),
  item('response_owner',19,'respond','The people responsible for decisions during a cyber incident are clearly named.'),
  item('isolate',20,'respond','Your IT support can quickly disable a compromised account or isolate an affected device without shutting down the whole business.'),
  item('notifications',21,'respond','The business has identified who may need to be notified after a cyber incident.'),
  item('backups',22,'recover','Important business data is backed up automatically.'),
  item('restore',23,'recover','Your team has successfully restored real files or systems from backup within the last year.',1.2,undefined,'high'),
  item('continuity',24,'recover','There is a practical plan for continuing critical work during a prolonged technology outage.')
];

export const coreQuestions = assessmentItems.filter(item => item.active).sort((a,b) => a.order-b.order);
export const questionsFor = (industry?:string) => {
  void industry;
  return coreQuestions;
};

export function validateAssessmentItems(items:Question[]):string[] {
  const errors:string[]=[];
  const ids=new Set<string>();
  const orders=new Set<number>();
  const validCategories=new Set(Object.keys(categories));
  for(const question of items.filter(item=>item.active)) {
    if(ids.has(question.id)) errors.push(`Duplicate question ID: ${question.id}`); else ids.add(question.id);
    if(!question.text.trim()) errors.push(`Question ${question.id} has no text`);
    if(!validCategories.has(question.category)) errors.push(`Question ${question.id} has an invalid category`);
    if(!Number.isInteger(question.order)||question.order<1) errors.push(`Question ${question.id} has an invalid order`);
    else if(orders.has(question.order)) errors.push(`Duplicate display order: ${question.order}`); else orders.add(question.order);
    if(!Number.isFinite(question.weight)||question.weight<=0) errors.push(`Question ${question.id} has an invalid scoring weight`);
  }
  return errors;
}
