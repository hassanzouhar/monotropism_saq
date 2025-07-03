import { MQItem, QuestionSection } from './types';

export const mqItems: MQItem[] = [
  { id: 1, text: "After a period of instability, I need a quiet and predictable environment.", reverse: false },
  { id: 2, text: "I need a quiet and predictable environment for me to switch from one task to another easily.", reverse: false },
  { id: 3, text: "I often struggle to concentrate in busy and/or unpredictable environments.", reverse: false },
  { id: 4, text: "I find sudden unexpected disruptions to my attention startling.", reverse: false },
  { id: 5, text: "It's distressing to be unexpectedly pulled away from something I'm engaged in.", reverse: false },
  { id: 6, text: "I rarely find simultaneously holding eye contact and making a verbal conversation with another person uncomfortable.", reverse: true },
  { id: 7, text: "I often notice details that others do not.", reverse: false },
  { id: 8, text: "Involvement in an activity of interest often reduces my anxiety level.", reverse: false },
  { id: 9, text: "I find social interactions more comfortable if communicating about a topic of interest to me.", reverse: false },
  { id: 10, text: "I am often totally focused on activities I am passionate about, to the point I am unaware of other events.", reverse: false },
  { id: 11, text: "I can get quite good at something even if I'm not especially interested in it.", reverse: true },
  { id: 12, text: "I often lose sense of time when engaging in activities I am passionate about.", reverse: false },
  { id: 13, text: "I sometimes avoid talking because I cannot reliably predict how others will react, especially strangers.", reverse: false },
  { id: 14, text: "I tend to do activities because I find them interesting, instead of due to societal expectations.", reverse: false },
  { id: 15, text: "I rarely find social situations chaotic.", reverse: true },
  { id: 16, text: "I don't mind if someone interrupts me when I'm in the middle of an activity.", reverse: true },
  { id: 17, text: "When I'm working on something, I'm open to helpful suggestions.", reverse: true },
  { id: 18, text: "I often find it difficult to switch topics after engaging in an activity for a long time.", reverse: false },
  { id: 19, text: "I often engage in activities I am passionate about to escape from anxiety.", reverse: false },
  { id: 20, text: "Routines provide an important source of stability and safety.", reverse: false },
  { id: 21, text: "I manage uncertainty by creating routines.", reverse: false },
  { id: 22, text: "I often experience anxiety over matters I have little certainty over.", reverse: false },
  { id: 23, text: "I find it difficult to engage in a task of no interest to me even if it is important.", reverse: false },
  { id: 24, text: "I often find engaging in stimming (e.g., fidgeting, rocking) to be relaxing.", reverse: false },
  { id: 25, text: "I am usually passionate about a few topics at any one time in my life.", reverse: false },
  { id: 26, text: "I have trouble filtering out sounds when I am not doing something I'm focused on.", reverse: false },
  { id: 27, text: "I usually mean what I say and no more than that.", reverse: true },
  { id: 28, text: "I often engage in lengthy discussions on topics I find interesting even though my conversational partner(s) do not.", reverse: false },
  { id: 29, text: "I sometimes accidentally say something others find offensive/rude when I am focused on a task.", reverse: false },
  { id: 30, text: "I can sometimes be very distressed by a topic that others think of as trivial.", reverse: true },
  { id: 31, text: "I find it easy to keep up with group discussions where everyone is speaking.", reverse: true },
  { id: 32, text: "Often when I am focused on activities, I do not notice I am thirsty or hungry.", reverse: false },
  { id: 33, text: "Often when I am focused on activities, I do not notice I need the bathroom.", reverse: false },
  { id: 34, text: "When there is a lot of information to consider, I often struggle to make a decision.", reverse: false },
  { id: 35, text: "Sometimes making a decision is so hard I get physically stuck.", reverse: false },
  { id: 36, text: "I sometimes focus on an incident for a substantial time (days) after the event.", reverse: false },
  { id: 37, text: "I sometimes become highly anxious by focusing on the many possible situations that might occur at a future event.", reverse: false },
  { id: 38, text: "Sometimes when I am focused on an activity, I do not recall all the information I might need to make good decisions.", reverse: false },
  { id: 39, text: "People tell me I get fixated on things.", reverse: false },
  { id: 40, text: "I find a problem I can't solve distressing and/or hard to put down.", reverse: false },
  { id: 41, text: "I tend to feel quite self-conscious unless I'm deeply absorbed in a task.", reverse: false },
  { id: 42, text: "I often get stuck thinking about all the possibilities that might come out of a decision.", reverse: false },
  { id: 43, text: "When I am interested in something, I tend to be passionate about it.", reverse: false },
  { id: 44, text: "When I am interested in a topic, I like to learn everything I can about that topic.", reverse: false },
  { id: 45, text: "I am still fascinated by many of the things I was interested in when I was much younger.", reverse: false },
  { id: 46, text: "I rarely find myself getting stuck in loops of thought.", reverse: true },
  { id: 47, text: "I often loop back to previous thoughts.", reverse: false }
];

export const questionSections: QuestionSection[] = [
  {
    title: "Environment & Focus",
    description: "Questions about your attention and environmental needs",
    items: [1, 2, 3, 4, 5, 16, 18, 26]
  },
  {
    title: "Interests & Passion",
    description: "Questions about your interests and engagement patterns", 
    items: [8, 10, 12, 14, 19, 25, 28, 39, 40, 43, 44, 45]
  },
  {
    title: "Social Interactions",
    description: "Questions about social communication and situations",
    items: [6, 9, 13, 15, 27, 29, 30, 31]
  },
  {
    title: "Routines & Uncertainty",
    description: "Questions about structure, routines, and managing uncertainty",
    items: [20, 21, 22]
  },
  {
    title: "Decision Making & Processing",
    description: "Questions about thinking patterns and decision-making",
    items: [34, 35, 36, 37, 38, 42, 46, 47]
  },
  {
    title: "Awareness & Focus States",
    description: "Questions about awareness during focused activities",
    items: [32, 33, 41]
  },
  {
    title: "Skills & Abilities", 
    description: "Questions about your capabilities and traits",
    items: [7, 11, 17, 23, 24]
  }
];

export const factorStructure: Record<string, number[]> = {
  'Special interests': [44, 43, 25, 45, 28, 39, 40, 14],
  'Rumination and anxiety': [37, 42, 22, 36, 47, 46],
  'Need for routines': [20, 21],
  'Environmental impact on attention tunnel': [4, 2, 3, 16, 5, 26, 1, 18],
  'Losing track when focusing': [32, 33, 12, 10],
  'Struggle with decision-making': [34, 35, 38, 23],
  'Anxiety-reducing effect of interests': [8, 19, 9],
  'Managing social interactions': [13, 15, 31, 27, 6, 30]
};
