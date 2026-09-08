import type { Contact,Tracking } from '../types';
export const FORMSPREE_ENDPOINT='https://formspree.io/f/xzebkrlp';
export const BOOKING_URL='https://outlook.office.com/bookwithme/user/0ee577695f664c78807e7141802ace01@myitsupportusa.com/meetingtype/c1RPOKJQi0Omp0XyvPCK9g2?anonymous&ismsaljsauthenabled&ep=mcard';
export async function submitEvent(data:Record<string,unknown>){const response=await fetch(FORMSPREE_ENDPOINT,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(data)});if(!response.ok)throw new Error('We could not securely submit your details. Check your connection and try again.');}
export function tracking():Tracking{const p=new URLSearchParams(location.search);return{utmSource:p.get('utm_source')||'',utmMedium:p.get('utm_medium')||'',utmCampaign:p.get('utm_campaign')||'',referrer:document.referrer,landingUrl:location.href,startedAt:new Date().toISOString()}}
export function contactPayload(contact:Contact,t:Tracking){return{_subject:'Cybersecurity Readiness Assessment Started',event:'Assessment started',...contact,...t}}
