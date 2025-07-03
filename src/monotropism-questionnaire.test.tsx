import { calculateScore, calculateFactorScores, getPredictedScore } from './utils/calculations';
import { mqItems, factorStructure } from './data';
import { Responses, Demographics } from './types';

describe('Scoring Logic', () => {
  describe('calculateScore', () => {
    it('should calculate the average score correctly for a set of responses', () => {
      const responses: Responses = {};
      mqItems.slice(0, 40).forEach(item => {
        responses[item.id] = 3; // "Neither agree nor disagree"
      });
      const score = calculateScore(responses, mqItems);
      expect(score).toBe(3);
    });

    it('should handle reversed items correctly', () => {
      const responses: Responses = {};
      mqItems.slice(0, 40).forEach(item => {
        responses[item.id] = 3;
      });
      responses[1] = 5; // not reversed
      responses[6] = 1; // reversed (should be 5)
      const score = calculateScore(responses, mqItems);
      const expected = ((38 * 3) + 5 + 5) / 40;
      expect(score).toBe(expected);
    });

    it('should return null if fewer than 40 questions are answered', () => {
      const responses: Responses = {};
      mqItems.slice(0, 39).forEach(item => {
        responses[item.id] = 3;
      });
      const score = calculateScore(responses, mqItems);
      expect(score).toBeNull();
    });

    it('should ignore "na" and null responses', () => {
      const responses: Responses = {};
      mqItems.slice(0, 42).forEach(item => {
        responses[item.id] = 3;
      });
      responses[1] = 'na';
      responses[2] = null;
      const score = calculateScore(responses, mqItems);
      expect(score).toBe(3);
    });
  });

  describe('calculateFactorScores', () => {
    it('should calculate the average score for each factor', () => {
      const responses: Responses = {};
      mqItems.forEach(item => {
        responses[item.id] = 3;
      });
      const factorScores = calculateFactorScores(responses, mqItems, factorStructure);
      Object.values(factorScores).forEach(score => {
        expect(score).toBe(3);
      });
    });

    it('should produce different scores for the social factor with all 1s and all 5s', () => {
      const socialFactorItems = factorStructure['Managing social interactions'];
      
      const responses1: Responses = {};
      mqItems.forEach(item => {
        responses1[item.id] = socialFactorItems.includes(item.id) ? 1 : 3;
      });

      const responses5: Responses = {};
      mqItems.forEach(item => {
        responses5[item.id] = socialFactorItems.includes(item.id) ? 5 : 3;
      });

      const factorScores1 = calculateFactorScores(responses1, mqItems, factorStructure);
      const factorScores5 = calculateFactorScores(responses5, mqItems, factorStructure);

      expect(factorScores1['Managing social interactions']).not.toBe(factorScores5['Managing social interactions']);
    });
  });

  describe('getPredictedScore', () => {
    it('should return the intercept for non-autistic, non-ADHD individuals', () => {
      const demographics: Demographics = { autistic: 'no', adhd: 'no', age: '', education: '' };
      const score = getPredictedScore(demographics);
      expect(score).toBe(3.03);
    });

    it('should correctly calculate the score for an autistic individual', () => {
      const demographics: Demographics = { autistic: 'yes', adhd: 'no', age: '', education: '' };
      const score = getPredictedScore(demographics);
      expect(score).toBe(3.03 + 1.04);
    });

    it('should correctly calculate the score for an individual with ADHD', () => {
      const demographics: Demographics = { autistic: 'no', adhd: 'yes', age: '', education: '' };
      const score = getPredictedScore(demographics);
      expect(score).toBe(3.03 + 0.56);
    });

    it('should correctly calculate the score for an autistic individual with ADHD', () => {
      const demographics: Demographics = { autistic: 'yes', adhd: 'yes', age: '', education: '' };
      const score = getPredictedScore(demographics);
      expect(score).toBe(3.03 + 1.04 + 0.56 - 0.43);
    });
  });
});