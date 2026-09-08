# My IT Support Cybersecurity Readiness Assessment

A polished, client-facing React and TypeScript assessment that captures a qualified lead, asks plain-English security questions, calculates six readiness scores, and presents an actionable report.

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Development builds show discreet helpers to fill sample contact details and preview weak or strong reports; Vite removes these controls from production builds.

## Checks and production build

```bash
npm test
npm run lint
npm run build
```

The static `dist/` output can be deployed to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host. Configure the host to serve `index.html` as the fallback if routes are added later.

## Where to make changes

- **Questions and industry branching:** `src/data/questions.ts`. Universal questions are in `coreQuestions`; targeted questions declare an `industries` array and are included by `questionsFor()`.
- **Categories, result explanations, and next steps:** `src/data/questions.ts` and `src/components/Results.tsx`.
- **Scoring:** `src/lib/scoring.ts`. Answers score Yes 5, Partially 3, Not sure 1, and No 0. Per-question weights default to 1. Category averages are equally represented in the overall score.
- **Formspree and booking configuration:** `src/lib/api.ts`. The first submission gates entry. Completion and booking-event submissions are intentionally non-blocking.
- **Flow and submission payloads:** `src/App.tsx`.
- **Visual system and responsive styles:** `src/styles.css`.

## Data and behavior notes

The app captures UTM source/medium/campaign, landing URL, referrer, and timestamps in memory. It does not store contact details or assessment answers in browser storage. A refresh therefore returns to the introduction rather than retaining personal data. The report is a general readiness snapshot and never represents itself as a compliance determination.

Industry branches currently cover Healthcare, Financial Services, Accounting, Legal, Government/Government Contractor, and Retail payment handling. Keep additions limited and phrased for a nontechnical business audience.
