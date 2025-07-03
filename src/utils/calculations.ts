import { Responses, Demographics, FactorScores, MQItem } from '../types';

export const calculateScore = (responses: Responses, mqItems: MQItem[]): number | null => {
  const validResponses = Object.entries(responses).filter(([_, value]) => value !== null && value !== 'na');
  if (validResponses.length < 40) return null;

  let totalScore = 0;
  validResponses.forEach(([itemId, value]) => {
    const item = mqItems.find(i => i.id === parseInt(itemId));
    if (!item) return;
    const numericValue = value as number;
    if (item.reverse) {
      totalScore += 6 - numericValue;
    } else {
      totalScore += numericValue;
    }
  });

  return totalScore / validResponses.length;
};

export const calculateFactorScores = (responses: Responses, mqItems: MQItem[], factorStructure: Record<string, number[]>): FactorScores => {
  const factorScores: FactorScores = {};

  Object.entries(factorStructure).forEach(([factorName, itemIds]) => {
    const factorResponses = itemIds
      .map(id => {
        const response = responses[id];
        if (response === null || response === 'na') return null;

        const item = mqItems.find(i => i.id === id);
        if (!item) return null;
        return item.reverse ? 6 - (response as number) : (response as number);
      })
      .filter((score): score is number => score !== null);

    if (factorResponses.length > 0) {
      factorScores[factorName] = factorResponses.reduce((a, b) => a + b, 0) / factorResponses.length;
    }
  });

  return factorScores;
};

export const getPredictedScore = (demographics: Demographics): number => {
  const intercept = 3.03;
  const autismBeta = 1.04;
  const adhdBeta = 0.56;
  const interactionBeta = -0.43;

  const isAutistic = demographics.autistic === 'yes';
  const hasAdhd = demographics.adhd === 'yes';

  return intercept +
         (isAutistic ? autismBeta : 0) +
         (hasAdhd ? adhdBeta : 0) +
         (isAutistic && hasAdhd ? interactionBeta : 0);
};
