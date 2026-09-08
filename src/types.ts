export type Category = 'leadership'|'assets'|'protect'|'detect'|'respond'|'recover';
export type Answer = 'yes'|'partially'|'no'|'unsure';
export type Question = { id:string; category:Category; text:string; help?:string; weight?:number; industries?:string[] };
export type Contact = { firstName:string; lastName:string; email:string; company:string; phone:string; website:string; industry:string; employees:string; itSupport:string };
export type Tracking = { utmSource:string; utmMedium:string; utmCampaign:string; referrer:string; landingUrl:string; startedAt:string };
