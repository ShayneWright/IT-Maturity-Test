import { categories } from '../data/questions'; import type { Answer,Category,Question } from '../types';
export const answerValues:Record<Answer,number>={yes:5,partially:3,unsure:1,no:0};
export function scoreAssessment(questions:Question[],answers:Record<string,Answer>){
 const scores={} as Record<Category,number>;
 (Object.keys(categories) as Category[]).forEach(c=>{const qs=questions.filter(x=>x.category===c&&answers[x.id]); const weight=qs.reduce((s,x)=>s+(x.weight||1),0); scores[c]=weight?Number((qs.reduce((s,x)=>s+answerValues[answers[x.id]]*(x.weight||1),0)/weight).toFixed(1)):0});
 const overall=Number(((Object.values(scores).reduce((a,b)=>a+b,0))/6).toFixed(1));
 const label=overall<1?'High Risk':overall<2?'Early Stage':overall<3?'Developing':overall<4?'Established':overall<4.6?'Managed':'Advanced';
 const ranked=(Object.keys(scores) as Category[]).sort((a,b)=>scores[a]-scores[b]);
 return {scores,overall,label,risks:ranked.slice(0,3),strengths:[...ranked].reverse().slice(0,3)};
}
