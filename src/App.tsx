import {useMemo,useRef,useState} from 'react';
import {Header} from './components/Header';
import {Landing} from './components/Landing';
import {ContactForm} from './components/ContactForm';
import {Assessment} from './components/Assessment';
import {Results} from './components/Results';
import {questionsFor} from './data/questions';
import {completionPayload,contactPayload,submitEvent,tracking} from './lib/api';
import {scoreAssessment} from './lib/scoring';
import type {Answer,Contact,Tracking} from './types';

type Stage='landing'|'contact'|'assessment'|'results';
const blank:Contact={firstName:'',lastName:'',email:'',company:'',phone:'',website:'',industry:'',employees:'',itSupport:'',cyberInsurance:''};

export default function App(){
  const [stage,setStage]=useState<Stage>('landing'),[contact,setContact]=useState(blank),[answers,setAnswers]=useState<Record<string,Answer>>({}),[index,setIndex]=useState(0);
  const source=useRef<Tracking>(tracking());
  const questions=useMemo(()=>questionsFor(contact.industry),[contact.industry]);
  const result=useMemo(()=>scoreAssessment(questions,answers),[questions,answers]);
  const go=(next:Stage)=>{setStage(next);scrollTo({top:0,behavior:'smooth'})};

  async function start(nextContact:Contact){
    await submitEvent(contactPayload(nextContact,source.current));
    setContact(nextContact);
    go('assessment');
  }

  function answer(value:Answer){
    const next={...answers,[questions[index].id]:value};
    setAnswers(next);
    if(index<questions.length-1){setTimeout(()=>setIndex(index+1),180);return;}
    const scored=scoreAssessment(questions,next);
    go('results');
    const answerReport=Object.fromEntries(questions.map(question=>[question.text,next[question.id]]));
    void submitEvent(completionPayload({...contact,overallScore:scored.overall,maturityLevel:scored.label,categoryScores:scored.scores,topThreeRisks:scored.risks,strongestAreas:scored.strengths,assessmentAnswers:answerReport,completionTimestamp:new Date().toISOString(),...source.current})).catch(()=>{});
  }

  function backQuestion(){if(index===0)go('contact');else setIndex(index-1)}
  const dev=import.meta.env.DEV;
  function fill(){setContact({firstName:'Taylor',lastName:'Morgan',email:'taylor@example.com',company:'Northstar Design',phone:'555-0100',website:'https://example.com',industry:'Other Business',employees:'26–50',itSupport:'Outsourced IT provider',cyberInsurance:'Yes'})}
  function sample(kind:'weak'|'strong'){const value=kind==='weak'?'no':'yes';const seeded=Object.fromEntries(questions.map((question,i)=>[question.id,i%5===0?'partially':value])) as Record<string,Answer>;setAnswers(seeded);go('results')}

  return <><Header compact={stage!=='landing'}/>{stage==='landing'&&<Landing onStart={()=>go('contact')}/>} {stage==='contact'&&<ContactForm initial={contact} onBack={()=>go('landing')} onSubmit={start} devFill={dev?fill:undefined}/>} {stage==='assessment'&&<><Assessment questions={questions} index={index} answers={answers} onAnswer={answer} onBack={backQuestion}/>{dev&&<div className="dev-panel"><b>Development preview</b><button onClick={()=>sample('weak')}>Weak result</button><button onClick={()=>sample('strong')}>Strong result</button></div>}</>} {stage==='results'&&<Results result={result} contact={contact}/>}<footer className="site-footer"><span>© {new Date().getFullYear()} My IT Support</span><span>Practical technology. Stronger businesses.</span></footer></>;
}
