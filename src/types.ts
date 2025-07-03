export type ResponseValue = number | 'na' | null;
export type Responses = Record<number, ResponseValue>;

export type Demographics = {
  autistic: 'yes' | 'no' | 'unsure' | null;
  adhd: 'yes' | 'no' | 'unsure' | null;
  age: string;
  education: string;
};

export type FactorScores = Record<string, number>;

export type MQItem = {
  id: number;
  text: string;
  reverse: boolean;
};

export type QuestionSection = {
  title: string;
  description: string;
  items: number[];
};
