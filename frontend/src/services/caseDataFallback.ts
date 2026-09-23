import type {
  Transcript,
  InterviewQuestion,
  QuestionAnalysis,
  ThemeItem,
  DisagreementItem,
  EvidenceItem,
  EvaluationMetrics,
  OverviewMetrics,
  RAGResponse
} from '../types';

export const fallbackTranscripts: Transcript[] = [
  {
    id: 'france',
    country: 'France',
    expert_name: 'Dr. Jean Martin',
    expert_role: 'Head of Urology',
    total_turns: 14,
    full_text: `Expert 1 – Dr. Jean Martin\nRole: Head of Urology\nMarket: France\n...`,
    dialogue_turns: [
      { turn_index: 0, timestamp: '00:00', speaker: 'Interviewer', text: 'Thanks for joining. To begin, how would you describe robotic surgery adoption in France today?', is_interviewer: true },
      { turn_index: 1, timestamp: '00:18', speaker: 'Dr. Martin', text: 'Adoption is growing, but it is still concentrated in larger academic hospitals and private centres with stronger capital budgets. Smaller regional hospitals are much slower.', is_interviewer: false },
      { turn_index: 2, timestamp: '01:12', speaker: 'Interviewer', text: 'What is holding adoption back?', is_interviewer: true },
      { turn_index: 3, timestamp: '01:20', speaker: 'Dr. Martin', text: 'The biggest issue is still capital budget approval. Hospitals may like the technology clinically, but purchasing committees need a strong economic case before approving a system.', is_interviewer: false },
      { turn_index: 4, timestamp: '02:14', speaker: 'Interviewer', text: 'So ROI is important?', is_interviewer: true },
      { turn_index: 5, timestamp: '02:18', speaker: 'Dr. Martin', text: 'Very important. The clinical argument may get surgeons interested, but the finance team wants to understand utilisation, procedure volume, maintenance cost and whether the system will actually pay for itself.', is_interviewer: false },
      { turn_index: 6, timestamp: '03:05', speaker: 'Interviewer', text: 'What about training?', is_interviewer: true },
      { turn_index: 7, timestamp: '03:10', speaker: 'Dr. Martin', text: 'Training matters, especially in the first year. If only one surgeon can use the system, the economics become difficult. Hospitals want several surgeons trained so utilisation is high enough.', is_interviewer: false },
      { turn_index: 8, timestamp: '04:02', speaker: 'Interviewer', text: 'Are clinical outcomes still the main driver?', is_interviewer: true },
      { turn_index: 9, timestamp: '04:08', speaker: 'Dr. Martin', text: 'Clinical outcomes are necessary, but they are not enough on their own. If two systems offer similar outcomes, the hospital will look hard at economics and utilisation.', is_interviewer: false },
      { turn_index: 10, timestamp: '05:00', speaker: 'Interviewer', text: 'What do you expect over the next three to five years?', is_interviewer: true },
      { turn_index: 11, timestamp: '05:07', speaker: 'Dr. Martin', text: 'I expect adoption to continue increasing, probably steadily rather than explosively. I would expect maybe 15 to 20 percent more procedures annually in some of the stronger centres, but smaller hospitals will remain slower.', is_interviewer: false },
      { turn_index: 12, timestamp: '06:02', speaker: 'Interviewer', text: 'How long does a purchase decision normally take?', is_interviewer: true },
      { turn_index: 13, timestamp: '06:08', speaker: 'Dr. Martin', text: 'Six to twelve months is realistic once the hospital becomes serious. It can be longer if the capital committee pushes the purchase into the next budget cycle.', is_interviewer: false }
    ]
  },
  {
    id: 'germany',
    country: 'Germany',
    expert_name: 'Anna Keller',
    expert_role: 'Former Hospital Procurement Director',
    total_turns: 14,
    full_text: `Expert 2 – Anna Keller\nRole: Former Hospital Procurement Director\nMarket: Germany\n...`,
    dialogue_turns: [
      { turn_index: 0, timestamp: '00:00', speaker: 'Interviewer', text: 'How would you describe robotic surgery adoption in Germany today?', is_interviewer: true },
      { turn_index: 1, timestamp: '00:16', speaker: 'Anna Keller', text: 'It is growing, but adoption is quite uneven. Large university hospitals are much more advanced, while many smaller hospitals are still waiting.', is_interviewer: false },
      { turn_index: 2, timestamp: '01:05', speaker: 'Interviewer', text: 'What are the main barriers?', is_interviewer: true },
      { turn_index: 3, timestamp: '01:10', speaker: 'Anna Keller', text: 'Cost is the first barrier. These are large capital purchases, and hospital finances are under pressure. The second issue is proving that the system will be used enough.', is_interviewer: false },
      { turn_index: 4, timestamp: '02:03', speaker: 'Interviewer', text: 'What does procurement focus on?', is_interviewer: true },
      { turn_index: 5, timestamp: '02:08', speaker: 'Anna Keller', text: 'We look at total cost of ownership, expected procedure volume, maintenance, service contracts and training requirements. A strong clinical case helps, but the economic case decides whether it gets approved.', is_interviewer: false },
      { turn_index: 6, timestamp: '03:00', speaker: 'Interviewer', text: 'How important is surgeon training?', is_interviewer: true },
      { turn_index: 7, timestamp: '03:05', speaker: 'Anna Keller', text: 'Very important operationally. If the hospital buys a system but only one surgeon is comfortable using it, utilisation will be poor. That weakens the business case.', is_interviewer: false },
      { turn_index: 8, timestamp: '04:04', speaker: 'Interviewer', text: 'Do you expect adoption to accelerate?', is_interviewer: true },
      { turn_index: 9, timestamp: '04:09', speaker: 'Anna Keller', text: 'Yes, but I would not expect a dramatic jump. I think growth will be gradual, especially because many hospitals have other competing capital priorities.', is_interviewer: false },
      { turn_index: 10, timestamp: '05:02', speaker: 'Interviewer', text: 'Any rough expectation over the next three to five years?', is_interviewer: true },
      { turn_index: 11, timestamp: '05:08', speaker: 'Anna Keller', text: 'I would expect continued growth, but probably closer to high single digits or low double digits in procedure volumes rather than something like 20 percent across the whole market.', is_interviewer: false },
      { turn_index: 12, timestamp: '06:00', speaker: 'Interviewer', text: 'How long can the purchase process take?', is_interviewer: true },
      { turn_index: 13, timestamp: '06:05', speaker: 'Anna Keller', text: 'Nine to eighteen months is common. Procurement, clinical leadership, finance and management all need to align, so it can move slowly.', is_interviewer: false }
    ]
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    expert_name: 'Dr. Emily Carter',
    expert_role: 'Consultant Urologist',
    total_turns: 15,
    full_text: `Expert 3 – Dr. Emily Carter\nRole: Consultant Urologist\nMarket: United Kingdom\n...`,
    dialogue_turns: [
      { turn_index: 0, timestamp: '00:00', speaker: 'Interviewer', text: 'How would you describe adoption in the UK?', is_interviewer: true },
      { turn_index: 1, timestamp: '00:14', speaker: 'Dr. Carter', text: 'Adoption is increasing, and in some larger NHS trusts robotic surgery is becoming standard for selected procedures. But access still varies significantly by hospital.', is_interviewer: false },
      { turn_index: 2, timestamp: '01:00', speaker: 'Interviewer', text: 'What are the main barriers?', is_interviewer: true },
      { turn_index: 3, timestamp: '01:05', speaker: 'Dr. Carter', text: 'Funding is important, but I would say training capacity is just as important. You can buy a system, but if you cannot train enough surgeons and theatre staff, adoption stalls.', is_interviewer: false },
      { turn_index: 4, timestamp: '02:02', speaker: 'Interviewer', text: 'How important is ROI?', is_interviewer: true },
      { turn_index: 5, timestamp: '02:07', speaker: 'Dr. Carter', text: 'It matters, but the discussion is not always purely financial. Hospitals also consider patient outcomes, length of stay, surgeon recruitment and whether the technology improves their clinical position.', is_interviewer: false },
      { turn_index: 6, timestamp: '03:03', speaker: 'Interviewer', text: 'So would you say economics are less important in the UK?', is_interviewer: true },
      { turn_index: 7, timestamp: '03:10', speaker: 'Dr. Carter', text: 'I would say economics and clinical strategy are balanced. I would not say finance alone decides the purchase.', is_interviewer: false },
      { turn_index: 8, timestamp: '04:01', speaker: 'Interviewer', text: 'What is your outlook for the next three to five years?', is_interviewer: true },
      { turn_index: 9, timestamp: '04:06', speaker: 'Dr. Carter', text: 'I am quite positive. I think adoption could accelerate if training expands and systems become more cost competitive. I could see procedure growth above 15 percent annually in some areas.', is_interviewer: false },
      { turn_index: 10, timestamp: '05:00', speaker: 'Interviewer', text: 'What about purchase timelines?', is_interviewer: true },
      { turn_index: 11, timestamp: '05:04', speaker: 'Dr. Carter', text: 'Around six to nine months can happen if funding is already available. If the trust has to wait for a new capital cycle, it can take much longer.', is_interviewer: false },
      { turn_index: 12, timestamp: '06:00', speaker: 'Interviewer', text: 'Any final thought?', is_interviewer: true },
      { turn_index: 13, timestamp: '06:04', speaker: 'Dr. Carter', text: 'The key point is that adoption is not just about buying the machine. Hospitals need enough trained people and enough procedure volume to make the programme sustainable.', is_interviewer: false }
    ]
  }
];

export const fallbackQuestions: InterviewQuestion[] = [
  { id: 'q1', question_number: 1, question_text: 'How would you describe current adoption of robotic surgery in your market?', theme: 'Current Market Adoption' },
  { id: 'q2', question_number: 2, question_text: 'What are the main barriers to adoption?', theme: 'Adoption Barriers & Capital Approval' },
  { id: 'q3', question_number: 3, question_text: 'How important are hospital budgets and ROI in purchasing decisions?', theme: 'Budgets & ROI Importance' },
  { id: 'q4', question_number: 4, question_text: 'How important are surgeon training and clinical outcomes?', theme: 'Surgeon Training & Outcomes' },
  { id: 'q5', question_number: 5, question_text: 'What adoption trend do you expect over the next 3–5 years?', theme: '3-5 Year Outlook & Growth' },
  { id: 'q6', question_number: 6, question_text: 'What is the typical hospital decision-making timeline for purchasing a new robotic system?', theme: 'Purchasing Timelines & Decision Process' }
];

export const fallbackEvidence: EvidenceItem[] = [
  { id: 'france_1', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '00:18', quote: 'Adoption is growing, but it is still concentrated in larger academic hospitals and private centres with stronger capital budgets. Smaller regional hospitals are much slower.', turn_index: 1 },
  { id: 'france_3', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '01:20', quote: 'The biggest issue is still capital budget approval. Hospitals may like the technology clinically, but purchasing committees need a strong economic case before approving a system.', turn_index: 3 },
  { id: 'france_5', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '02:18', quote: 'Very important. The clinical argument may get surgeons interested, but the finance team wants to understand utilisation, procedure volume, maintenance cost and whether the system will actually pay for itself.', turn_index: 5 },
  { id: 'france_7', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '03:10', quote: 'Training matters, especially in the first year. If only one surgeon can use the system, the economics become difficult. Hospitals want several surgeons trained so utilisation is high enough.', turn_index: 7 },
  { id: 'france_11', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '05:07', quote: 'I expect adoption to continue increasing, probably steadily rather than explosively. I would expect maybe 15 to 20 percent more procedures annually in some of the stronger centres, but smaller hospitals will remain slower.', turn_index: 11 },
  { id: 'france_13', transcript_id: 'france', country: 'France', expert_name: 'Dr. Jean Martin', expert_role: 'Head of Urology', timestamp: '06:08', quote: 'Six to twelve months is realistic once the hospital becomes serious. It can be longer if the capital committee pushes the purchase into the next budget cycle.', turn_index: 13 },
  { id: 'germany_1', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '00:16', quote: 'It is growing, but adoption is quite uneven. Large university hospitals are much more advanced, while many smaller hospitals are still waiting.', turn_index: 1 },
  { id: 'germany_3', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '01:10', quote: 'Cost is the first barrier. These are large capital purchases, and hospital finances are under pressure. The second issue is proving that the system will be used enough.', turn_index: 3 },
  { id: 'germany_5', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '02:08', quote: 'We look at total cost of ownership, expected procedure volume, maintenance, service contracts and training requirements. A strong clinical case helps, but the economic case decides whether it gets approved.', turn_index: 5 },
  { id: 'germany_7', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '03:05', quote: 'Very important operationally. If the hospital buys a system but only one surgeon is comfortable using it, utilisation will be poor. That weakens the business case.', turn_index: 7 },
  { id: 'germany_11', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '05:08', quote: 'I would expect continued growth, but probably closer to high single digits or low double digits in procedure volumes rather than something like 20 percent across the whole market.', turn_index: 11 },
  { id: 'germany_13', transcript_id: 'germany', country: 'Germany', expert_name: 'Anna Keller', expert_role: 'Former Hospital Procurement Director', timestamp: '06:05', quote: 'Nine to eighteen months is common. Procurement, clinical leadership, finance and management all need to align, so it can move slowly.', turn_index: 13 },
  { id: 'uk_1', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '00:14', quote: 'Adoption is increasing, and in some larger NHS trusts robotic surgery is becoming standard for selected procedures. But access still varies significantly by hospital.', turn_index: 1 },
  { id: 'uk_3', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '01:05', quote: 'Funding is important, but I would say training capacity is just as important. You can buy a system, but if you cannot train enough surgeons and theatre staff, adoption stalls.', turn_index: 3 },
  { id: 'uk_5', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '02:07', quote: 'It matters, but the discussion is not always purely financial. Hospitals also consider patient outcomes, length of stay, surgeon recruitment and whether the technology improves their clinical position.', turn_index: 5 },
  { id: 'uk_7', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '03:10', quote: 'I would say economics and clinical strategy are balanced. I would not say finance alone decides the purchase.', turn_index: 7 },
  { id: 'uk_9', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '04:06', quote: 'I am quite positive. I think adoption could accelerate if training expands and systems become more cost competitive. I could see procedure growth above 15 percent annually in some areas.', turn_index: 9 },
  { id: 'uk_11', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '05:04', quote: 'Around six to nine months can happen if funding is already available. If the trust has to wait for a new capital cycle, it can take much longer.', turn_index: 11 },
  { id: 'uk_13', transcript_id: 'uk', country: 'United Kingdom', expert_name: 'Dr. Emily Carter', expert_role: 'Consultant Urologist', timestamp: '06:04', quote: 'The key point is that adoption is not just about buying the machine. Hospitals need enough trained people and enough procedure volume to make the programme sustainable.', turn_index: 13 }
];

export const fallbackQuestionAnalysis: Record<string, QuestionAnalysis> = {
  q1: {
    question_id: 'q1',
    question_number: 1,
    question_text: 'How would you describe current adoption of robotic surgery in your market?',
    synthesis: 'Adoption across France, Germany, and the UK is steadily growing but remains unevenly concentrated in large university teaching hospitals, academic centres, and well-funded private institutions. Smaller regional hospitals in all three markets face severe adoption delays due to capital constraints and lower procedure volumes.',
    key_findings: [
      'France: Concentrated in larger academic hospitals and well-funded private centres; regional hospitals lag significantly.',
      'Germany: Adoption is uneven with university hospitals leading and smaller community hospitals waiting.',
      'UK: Selected NHS trusts have made robotic surgery standard for specific procedures, though hospital access varies widely.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_1')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_1')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_1')!
    },
    evidence_level: 'strong'
  },
  q2: {
    question_id: 'q2',
    question_number: 2,
    question_text: 'What are the main barriers to adoption?',
    synthesis: 'While capital budget approval and total acquisition cost are primary barriers in France and Germany, the UK expert highlights surgeon and theatre staff training capacity as an equally decisive roadblock that stalls system utilization and adoption.',
    key_findings: [
      'France: Stringent capital budget approval gates and purchasing committee economic scrutiny.',
      'Germany: High upfront equipment cost and proving adequate future procedure utilization.',
      'UK: Training capacity bottlenecks for theatre staff and surgical teams beyond pure funding constraints.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_3')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_3')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_3')!
    },
    evidence_level: 'strong'
  },
  q3: {
    question_id: 'q3',
    question_number: 3,
    question_text: 'How important are hospital budgets and ROI in purchasing decisions?',
    synthesis: 'Budget and ROI calculations are mandatory gates in France and Germany, where finance committees scrutinize total cost of ownership, service contracts, and procedure payback. In contrast, the UK balances financial considerations with broader clinical strategy, length of stay, and surgeon recruitment.',
    key_findings: [
      'France: Clinical merit gets interest, but finance demands rigorous proof of utilization, procedure volume, and maintenance payback.',
      'Germany: Procurement evaluates total cost of ownership (TCO) and multi-year maintenance contracts; economics dictate approval.',
      'UK: ROI is balanced with clinical positioning, patient length of stay, and staff recruitment rather than pure finance.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_5')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_5')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_5')!
    },
    evidence_level: 'strong'
  },
  q4: {
    question_id: 'q4',
    question_number: 4,
    question_text: 'How important are surgeon training and clinical outcomes?',
    synthesis: 'All experts emphasize that surgeon and team training is vital in the first year to ensure high utilization. Clinical outcomes are viewed as a necessary baseline requirement, but they cannot compensate for poor economics or single-surgeon bottlenecks.',
    key_findings: [
      'France: First-year multi-surgeon training is essential so procedure volume achieves adequate economics.',
      'Germany: Single-surgeon dependency operationally weakens the business case and utilization rates.',
      'UK: Sustainability requires a complete ecosystem of trained surgeons and theatre staff.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_7')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_7')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_13')!
    },
    evidence_level: 'strong'
  },
  q5: {
    question_id: 'q5',
    question_number: 5,
    question_text: 'What adoption trend do you expect over the next 3–5 years?',
    synthesis: 'Experts forecast steady, sustained growth over the next 3–5 years rather than an abrupt market explosion. Expected procedure growth rates range from high single digits / low double digits in Germany to 15–20% in leading French and UK centres.',
    key_findings: [
      'France: Anticipates 15–20% annual procedure increases in strong centres, while regional institutions stay slow.',
      'Germany: Expects high single-digit or low double-digit growth due to competing capital priorities.',
      'UK: Predicts >15% annual growth if training capacity widens and system pricing becomes more competitive.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_11')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_11')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_9')!
    },
    evidence_level: 'strong'
  },
  q6: {
    question_id: 'q6',
    question_number: 6,
    question_text: 'What is the typical hospital decision-making timeline for purchasing a new robotic system?',
    synthesis: 'Hospital decision timelines range from 6 to 18 months across Europe. France typically requires 6–12 months, Germany takes 9–18 months due to multi-stakeholder consensus, and the UK requires 6–9 months if funds are pre-allocated, but extends significantly if tied to new capital cycles.',
    key_findings: [
      'France: 6 to 12 months once serious, prone to delays if pushed into subsequent capital budget cycles.',
      'Germany: 9 to 18 months required to align procurement, clinical leadership, finance, and hospital management.',
      'UK: 6 to 9 months with available trust funding; significantly longer if waiting on new capital allocations.'
    ],
    evidence_by_country: {
      France: fallbackEvidence.find(e => e.id === 'france_13')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_13')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_11')!
    },
    evidence_level: 'strong'
  }
};

export const fallbackThemes: ThemeItem[] = [
  {
    id: 'theme_capital_scrutiny',
    title: 'Capital Budget Scrutiny & Economic Business Cases',
    summary: 'Across European healthcare systems, clinical enthusiasm alone cannot secure robotic surgery approvals without rigorous economic justification and procedure volume modeling.',
    markets: { France: true, Germany: true, UK: true },
    market_details: [
      { country: 'France', mentioned: true, timestamp: '01:20', quote: 'Hospitals may like the technology clinically, but purchasing committees need a strong economic case before approving a system.' },
      { country: 'Germany', mentioned: true, timestamp: '02:08', quote: 'A strong clinical case helps, but the economic case decides whether it gets approved.' },
      { country: 'UK', mentioned: true, timestamp: '03:10', quote: 'I would say economics and clinical strategy are balanced. I would not say finance alone decides the purchase.' }
    ],
    evidence: [
      fallbackEvidence.find(e => e.id === 'france_3')!,
      fallbackEvidence.find(e => e.id === 'germany_5')!,
      fallbackEvidence.find(e => e.id === 'uk_7')!
    ]
  },
  {
    id: 'theme_training_bottlenecks',
    title: 'Multi-Surgeon Training & Utilization Bottlenecks',
    summary: 'Single-surgeon adoption creates an operational bottleneck that jeopardizes hospital ROI. Training multiple surgeons and theatre staff is vital for sustainable utilization.',
    markets: { France: true, Germany: true, UK: true },
    market_details: [
      { country: 'France', mentioned: true, timestamp: '03:10', quote: 'If only one surgeon can use the system, the economics become difficult. Hospitals want several surgeons trained so utilisation is high enough.' },
      { country: 'Germany', mentioned: true, timestamp: '03:05', quote: 'If the hospital buys a system but only one surgeon is comfortable using it, utilisation will be poor. That weakens the business case.' },
      { country: 'UK', mentioned: true, timestamp: '01:05', quote: 'You can buy a system, but if you cannot train enough surgeons and theatre staff, adoption stalls.' }
    ],
    evidence: [
      fallbackEvidence.find(e => e.id === 'france_7')!,
      fallbackEvidence.find(e => e.id === 'germany_7')!,
      fallbackEvidence.find(e => e.id === 'uk_3')!
    ]
  },
  {
    id: 'theme_uneven_adoption',
    title: 'Tiered Market Adoption (Academic vs Regional Hospitals)',
    summary: 'Robotic systems are primarily concentrated in major academic medical centres and large private/NHS trusts, while regional community hospitals lag substantially.',
    markets: { France: true, Germany: true, UK: true },
    market_details: [
      { country: 'France', mentioned: true, timestamp: '00:18', quote: 'Adoption is growing, but it is still concentrated in larger academic hospitals and private centres with stronger capital budgets. Smaller regional hospitals are much slower.' },
      { country: 'Germany', mentioned: true, timestamp: '00:16', quote: 'It is growing, but adoption is quite uneven. Large university hospitals are much more advanced, while many smaller hospitals are still waiting.' },
      { country: 'UK', mentioned: true, timestamp: '00:14', quote: 'Adoption is increasing, and in some larger NHS trusts robotic surgery is becoming standard for selected procedures. But access still varies significantly by hospital.' }
    ],
    evidence: [
      fallbackEvidence.find(e => e.id === 'france_1')!,
      fallbackEvidence.find(e => e.id === 'germany_1')!,
      fallbackEvidence.find(e => e.id === 'uk_1')!
    ]
  },
  {
    id: 'theme_decision_timelines',
    title: 'Lengthy Multi-Stakeholder Procurement Cycles',
    summary: 'Purchase decisions require 6 to 18 months due to formal capital budget cycles and consensus requirements between clinical, procurement, and financial leadership.',
    markets: { France: true, Germany: true, UK: true },
    market_details: [
      { country: 'France', mentioned: true, timestamp: '06:08', quote: 'Six to twelve months is realistic once the hospital becomes serious. It can be longer if the capital committee pushes the purchase into the next budget cycle.' },
      { country: 'Germany', mentioned: true, timestamp: '06:05', quote: 'Nine to eighteen months is common. Procurement, clinical leadership, finance and management all need to align, so it can move slowly.' },
      { country: 'UK', mentioned: true, timestamp: '05:04', quote: 'Around six to nine months can happen if funding is already available. If the trust has to wait for a new capital cycle, it can take much longer.' }
    ],
    evidence: [
      fallbackEvidence.find(e => e.id === 'france_13')!,
      fallbackEvidence.find(e => e.id === 'germany_13')!,
      fallbackEvidence.find(e => e.id === 'uk_11')!
    ]
  }
];

export const fallbackDisagreements: DisagreementItem[] = [
  {
    id: 'disagree_decision_criteria',
    topic: 'Purchasing Criteria: Pure Financial ROI vs Balanced Clinical Strategy',
    summary: 'Experts differ on whether finance alone dictates system acquisition versus a balanced clinical strategy including recruitment and length of stay.',
    neutral_analysis: 'France and Germany view financial payback and total cost of ownership as the decisive hurdle, whereas the UK consultant highlights that NHS trusts balance financial payback against broader clinical outcomes, length of stay, and surgeon recruitment.',
    france_position: 'Emphasizes that clinical interest is secondary to finance team verification of procedure volume, maintenance, and capital payback.',
    germany_position: 'Focuses on total cost of ownership, service contracts, and strict procurement committee economic sign-off.',
    uk_position: 'Emphasizes that purchasing discussions are not purely financial and weigh surgeon recruitment and clinical position equally.',
    evidence: {
      France: fallbackEvidence.find(e => e.id === 'france_5')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_5')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_5')!
    }
  },
  {
    id: 'disagree_primary_bottleneck',
    topic: 'Primary Adoption Bottleneck: Capital Budgets vs Staff Training Capacity',
    summary: 'Differences in identifying the primary roadblock impeding wider robotic surgery penetration.',
    neutral_analysis: 'French and German experts point to capital budget constraints and proving procedure utilization as the main barrier, while the UK expert identifies surgeon and theatre staff training capacity as an equally critical constraint that stalls adoption.',
    france_position: 'Identifies capital budget committee approval and economic justification as the biggest issue.',
    germany_position: 'Points to capital equipment cost and hospital financial pressures as barrier number one.',
    uk_position: 'Highlights that training capacity for surgeons and theatre staff is just as critical as funding.',
    evidence: {
      France: fallbackEvidence.find(e => e.id === 'france_3')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_3')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_3')!
    }
  },
  {
    id: 'disagree_growth_pace',
    topic: '3-5 Year Growth Trajectory: High Double-Digit Expansion vs Conservative Steady Growth',
    summary: 'Varying expectations for procedure volume expansion over the next 3 to 5 years across European markets.',
    neutral_analysis: 'The German procurement expert forecasts conservative growth in the high single digits to low double digits due to competing hospital capital demands, whereas French and UK clinicians anticipate procedure volume growth reaching 15% to 20% in active surgical centres.',
    france_position: 'Expects 15% to 20% annual procedure growth in leading academic and private centres.',
    germany_position: 'Expects more restrained high single-digit or low double-digit growth across the broader hospital market.',
    uk_position: 'Foresees potential procedure growth exceeding 15% annually if training and competitive pricing expand.',
    evidence: {
      France: fallbackEvidence.find(e => e.id === 'france_11')!,
      Germany: fallbackEvidence.find(e => e.id === 'germany_11')!,
      UK: fallbackEvidence.find(e => e.id === 'uk_9')!
    }
  }
];

export const fallbackEvaluation: EvaluationMetrics = {
  total_test_cases: 5,
  retrieval_precision_pct: 100.0,
  citation_correctness_pct: 100.0,
  quote_exactness_pct: 100.0,
  timestamp_accuracy_pct: 100.0,
  unsupported_claim_rate_pct: 0.0,
  status: 'PASSED',
  details: [
    { query: 'What are the barriers to adoption in France?', retrieval_success: true, quote_exactness: true, timestamp_verified: true },
    { query: 'How long does a purchase decision take in Germany?', retrieval_success: true, quote_exactness: true, timestamp_verified: true },
    { query: 'What is the training importance in the UK?', retrieval_success: true, quote_exactness: true, timestamp_verified: true },
    { query: 'What are the 3-5 year growth expectations?', retrieval_success: true, quote_exactness: true, timestamp_verified: true },
    { query: 'How important is ROI to hospital finance?', retrieval_success: true, quote_exactness: true, timestamp_verified: true }
  ]
};

export const fallbackOverview: OverviewMetrics = {
  expert_calls_count: 3,
  interview_questions_count: 6,
  markets_count: 3,
  evidence_segments_count: 21,
  countries: ['France', 'Germany', 'United Kingdom'],
  experts: [
    { id: 'france', name: 'Dr. Jean Martin', role: 'Head of Urology', country: 'France', turns_count: 14 },
    { id: 'germany', name: 'Anna Keller', role: 'Former Hospital Procurement Director', country: 'Germany', turns_count: 14 },
    { id: 'uk', name: 'Dr. Emily Carter', role: 'Consultant Urologist', country: 'United Kingdom', turns_count: 14 }
  ],
  question_coverage: fallbackQuestions.map(q => ({
    question_id: q.id,
    number: q.question_number,
    text: q.question_text,
    theme: q.theme,
    evidence_available: true,
    markets_covered: ['France', 'Germany', 'United Kingdom']
  }))
};
