import {describe,it,expect} from 'vitest';
import {answerValues,scoreAssessment} from './scoring';
import {assessmentItems,coreQuestions,questionsFor,validateAssessmentItems} from '../data/questions';
import {ASSESSMENT_VERSION} from '../config/assessment';
import {completionPayload,contactPayload} from './api';
import type {Contact,Question,Tracking} from '../types';

describe('assessment configuration',()=>{
  it('contains exactly 24 active scored questions',()=>{
    expect(coreQuestions).toHaveLength(24);
    expect(coreQuestions.every(question=>question.active)).toBe(true);
  });

  it('contains no industry branching and industry does not change the count',()=>{
    expect(assessmentItems.some(question=>'industries' in question)).toBe(false);
    expect(questionsFor('Legal')).toHaveLength(24);
    expect(questionsFor('Healthcare')).toEqual(questionsFor('Other Business'));
  });

  it('keeps cyber insurance outside the scored assessment',()=>{
    expect(assessmentItems.some(question=>question.id==='insurance')).toBe(false);
  });

  it('has unique IDs and valid active item configuration',()=>{
    expect(new Set(coreQuestions.map(question=>question.id)).size).toBe(24);
    expect(validateAssessmentItems(assessmentItems)).toEqual([]);
  });

  it('detects invalid IDs, text, categories, orders, and weights',()=>{
    const invalid=[
      {...coreQuestions[0]},
      {...coreQuestions[0],text:'',category:'invalid',weight:0},
    ] as Question[];
    const errors=validateAssessmentItems(invalid).join(' ');
    expect(errors).toContain('Duplicate question ID');
    expect(errors).toContain('has no text');
    expect(errors).toContain('invalid category');
    expect(errors).toContain('Duplicate display order');
    expect(errors).toContain('invalid scoring weight');
  });
});

describe('scoring',()=>{
  it('retains the Fully, Partly, Not, and Not sure mappings',()=>{
    expect(answerValues).toEqual({yes:5,partially:3,unsure:1,no:0});
  });

  it('scores complete fully-in-place answers as advanced',()=>{
    const answers=Object.fromEntries(coreQuestions.map(question=>[question.id,'yes'])) as never;
    const result=scoreAssessment(coreQuestions,answers);
    expect(result.overall).toBe(5);
    expect(result.label).toBe('Advanced');
  });
});

describe('versioning',()=>{
  const contact:Contact={firstName:'A',lastName:'B',email:'a@example.com',company:'Example',phone:'',website:'',industry:'Legal',employees:'1–10',itSupport:'Not sure',cyberInsurance:'Not sure'};
  const source:Tracking={utmSource:'',utmMedium:'',utmCampaign:'',referrer:'',landingUrl:'https://example.com',startedAt:'2026-01-01'};

  it('uses assessment version 1.1.1 in start and completion payloads',()=>{
    expect(ASSESSMENT_VERSION).toBe('1.1.1');
    expect(contactPayload(contact,source).assessmentVersion).toBe(ASSESSMENT_VERSION);
    expect(completionPayload({company:'Example'}).assessmentVersion).toBe(ASSESSMENT_VERSION);
  });
});
