import {CheckCircle2,Download,ExternalLink,Flag,ShieldCheck,TriangleAlert} from 'lucide-react';
import {RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,ResponsiveContainer,Legend} from 'recharts';
import {categories} from '../data/questions';
import {BOOKING_URL,submitEvent} from '../lib/api';
import {ASSESSMENT_VERSION} from '../config/assessment';
import {MY_IT_SUPPORT_LOGO} from '../assets/logo';
import type {Category,Contact} from '../types';

type Result={scores:Record<Category,number>;overall:number;label:string;risks:Category[];strengths:Category[]};

export function Results({result,contact}:{result:Result;contact:Contact}){
  const chart=Object.entries(categories).map(([key,category])=>({subject:category.short,score:result.scores[key as Category],target:3}));
  const reportDate=new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
  const booking=()=>{void submitEvent({_subject:'Cybersecurity Readiness Booking CTA Clicked',event:'Booking CTA clicked',assessmentVersion:ASSESSMENT_VERSION,email:contact.email,company:contact.company,score:result.overall,timestamp:new Date().toISOString()}).catch(()=>{})};
  return <main className="results">
    <div className="print-report-header"><img src={MY_IT_SUPPORT_LOGO} alt="My IT Support"/><div><b>Cybersecurity Readiness Report</b><span>{contact.company} · {reportDate}</span></div></div>
    <section className="result-hero"><div><div className="eyebrow"><ShieldCheck/> Your personalized report</div><h1>Your Cybersecurity Readiness</h1><p>A practical snapshot of where {contact.company} stands today—and where focused action can make the biggest difference.</p></div><div className="score-orb"><small>Overall score</small><strong>{result.overall}<span>/5</span></strong><mark>{result.label}</mark></div></section>
    <div className="report-actions"><button className="button secondary save-report" onClick={()=>window.print()}><Download/> Save Report as PDF</button></div>
    <section className="report-grid">
      <article className="chart-card"><div className="card-heading"><div><span className="overline">READINESS BY AREA</span><h2>Your security profile</h2></div><span className="benchmark"><i/>Target: 3.0</span></div><div className="chart screen-radar"><ResponsiveContainer width="100%" height="100%"><RadarChart data={chart} outerRadius="68%"><PolarGrid stroke="#d6dfeb"/><PolarAngleAxis dataKey="subject" tick={{fill:'#42536a',fontSize:12}}/><PolarRadiusAxis domain={[0,5]} tick={false} axisLine={false}/><Radar name="Your score" dataKey="score" stroke="#1976d2" fill="#25a4e8" fillOpacity={.28} strokeWidth={3}/><Radar name="Target" dataKey="target" stroke="#90a1b5" fill="transparent" strokeDasharray="5 5"/><Legend/></RadarChart></ResponsiveContainer></div><PrintRadarChart data={chart}/><p className="sr-only">Scores out of five: {chart.map(item=>`${item.subject} ${item.score}`).join(', ')}.</p></article>
      <article className="summary-card"><span className="overline">WHAT YOUR SCORE MEANS</span><h2>{result.label}</h2><p>{summary[result.label]}</p><div className="category-list">{Object.entries(categories).map(([key,category])=><div key={key}><span>{category.label}</span><b>{result.scores[key as Category].toFixed(1)}</b><i><em style={{width:`${result.scores[key as Category]/5*100}%`}}/></i></div>)}</div></article>
    </section>
    <section className="insights"><div className="section-title"><span className="overline">YOUR RESULTS, PRIORITIZED</span><h2>Focus on what matters most</h2><p>A short, practical view—not an overwhelming list of everything you could do.</p></div><div className="insight-grid"><article><div className="icon good"><CheckCircle2/></div><h3>Your strongest areas</h3>{result.strengths.map(category=><div className="insight-row" key={category}><b>{categories[category].label}<small>{result.scores[category]} / 5</small></b><p>{categories[category].description}</p></div>)}</article><article><div className="icon risk"><TriangleAlert/></div><h3>Your priority risks</h3>{result.risks.map(category=><div className="insight-row" key={category}><b>{categories[category].label}<small>{result.scores[category]} / 5</small></b><p>{categories[category].description}</p></div>)}</article></div></section>
    <section className="next"><div className="section-title"><span className="overline">YOUR ACTION PLAN</span><h2>Three smart next steps</h2></div>{result.risks.map((category,index)=><article key={category}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{categories[category].label}</h3><p>{categories[category].recommendation}</p></div><Flag/></article>)}</section>
    <section className="cta"><div><span className="overline">A CLEARER PATH FORWARD</span><h2>Want help making sense of your results?</h2><p>Book a short call with Shayne Wright. We’ll walk through what matters, what can wait, and where we’d start.</p><span className="print-contact">myitsupportusa.com</span></div><a className="button light" href={BOOKING_URL} target="_blank" rel="noreferrer" onClick={booking}>Talk Through My Results <ExternalLink/></a></section>
    <p className="disclaimer">This report is a general readiness assessment based on your responses. It is not an audit, legal opinion, certification, or formal compliance determination.</p>
    <footer className="print-report-footer"><span>My IT Support · Cybersecurity Readiness Assessment</span><span>Version {ASSESSMENT_VERSION}</span></footer>
  </main>;
}

const summary:Record<string,string>={'High Risk':'Several foundational safeguards may be missing. Focused action now can materially reduce the chance and impact of an incident.','Early Stage':'You have a starting point, but important gaps could leave the business exposed. Prioritize a few essential controls.','Developing':'Useful protections are taking shape, though consistency and coverage need attention.','Established':'Your business has a solid foundation. Closing a few focused gaps will improve resilience and consistency.','Managed':'Strong safeguards are operating across the business. Continue testing and refining them.','Advanced':'Your practices show strong, consistent maturity. Keep validating them as the business and threats change.'};

function PrintRadarChart({data}:{data:{subject:string;score:number;target:number}[]}){
  const center={x:180,y:145},radius=92;
  const point=(index:number,value:number)=>{const angle=-Math.PI/2+index*Math.PI/3;const scaled=radius*value/5;return `${center.x+Math.cos(angle)*scaled},${center.y+Math.sin(angle)*scaled}`};
  const polygon=(value:number)=>data.map((_,index)=>point(index,value)).join(' ');
  const scores=data.map((item,index)=>point(index,item.score)).join(' ');
  const labels=[{x:180,y:25,a:'middle'},{x:300,y:82,a:'start'},{x:300,y:212,a:'start'},{x:180,y:270,a:'middle'},{x:60,y:212,a:'end'},{x:60,y:82,a:'end'}] as const;
  return <svg className="print-radar" viewBox="0 0 360 285" role="img" aria-label="Printable readiness radar chart">
    <g className="print-radar-grid">{[1,2,3,4,5].map(value=><polygon key={value} points={polygon(value)}/>)}{data.map((_,index)=><line key={index} x1={center.x} y1={center.y} x2={point(index,5).split(',')[0]} y2={point(index,5).split(',')[1]}/>)}</g>
    <polygon className="print-radar-target" points={polygon(3)}/>
    <polygon className="print-radar-score" points={scores}/>
    {data.map((item,index)=><text key={item.subject} x={labels[index].x} y={labels[index].y} textAnchor={labels[index].a}>{item.subject}</text>)}
  </svg>;
}
