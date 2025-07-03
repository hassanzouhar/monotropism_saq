import React from 'react';
import { getPredictedScore } from '../utils/calculations';
import { FactorScores, Demographics } from '../types';

interface ResultsProps {
  totalScore: number | null;
  factorScores: FactorScores;
  demographics: Demographics;
  onStartOver: () => void;
}

export const Results: React.FC<ResultsProps> = ({ totalScore, factorScores, demographics, onStartOver }) => {
  

  const getScoreInterpretation = (score: number | null) => {
    if (!score) return { level: "Unknown", color: "text-gray-600", description: "Insufficient data" };
    if (score >= 4.0) return { level: "Very High", color: "text-purple-600", description: "Score indicates very high monotropic traits" };
    if (score >= 3.4) return { level: "High", color: "text-blue-600", description: "Score indicates high monotropic traits" };
    if (score >= 2.8) return { level: "Moderate", color: "text-green-600", description: "Score indicates moderate monotropic traits" };
    return { level: "Lower", color: "text-gray-600", description: "Score indicates lower monotropic traits" };
  };

  const predictedScore = getPredictedScore(demographics);
  const interpretation = getScoreInterpretation(totalScore);

  if (!totalScore) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">Insufficient Data</h2>
          <p>Please complete at least 40 items to receive results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Your Monotropism Profile</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Overall Monotropism Score</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{totalScore.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Average Score (1-5)</div>
          </div>
          <div className="flex-1">
            <div className={`text-lg font-medium ${interpretation.color}`}>{interpretation.level} Monotropic Traits</div>
            <div className="text-gray-600">{interpretation.description}</div>
            {(demographics.autistic === 'yes' || demographics.adhd === 'yes') && (
              <div className="mt-2 text-sm">
                <span className="text-gray-600">Predicted score based on your background: </span>
                <span className="font-medium">{predictedScore.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Eight-Factor Monotropism Profile</h3>
        <p className="text-gray-600 mb-6">This shows how your monotropic style manifests across different dimensions:</p>
        
        <div className="grid gap-4">
          {Object.entries(factorScores).map(([factor, score]) => (
            <div key={factor} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">{factor}</span>
                <span className={`font-medium ${
                  score !== undefined && !isNaN(score) 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}>
                  {score !== undefined && !isNaN(score) ? score.toFixed(2) : 'No data'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${score !== undefined && !isNaN(score) ? (score / 5) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">Understanding Your Results</h3>
        <div className="text-amber-800 space-y-2 text-sm">
          <p><strong>Important:</strong> These results reflect your cognitive style, not a diagnosis.</p>
          <p><strong>Score Range:</strong> 1-5 scale where higher scores indicate more monotropic traits.</p>
          <p><strong>Research Context:</strong> Autistic adults in the validation study averaged 4.15; non-autistic adults averaged 3.19.</p>
          <p><strong>Individual Variation:</strong> People express monotropism differently across the eight factors.</p>
        </div>
      </div>

      {(demographics.autistic === 'yes' || demographics.adhd === 'yes') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Diagnostic Context</h3>
          <div className="text-blue-800 space-y-2 text-sm">
            {demographics.autistic === 'yes' && demographics.adhd === 'yes' && (
              <p><strong>Autism + ADHD:</strong> Research shows a complex, non-additive relationship where having both conditions doesn't simply add their individual effects on monotropism.</p>
            )}
            {demographics.autistic === 'yes' && demographics.adhd !== 'yes' && (
              <p><strong>Autism:</strong> Monotropism theory was originally developed to explain autistic cognitive style, particularly the tendency toward deep, focused interests.</p>
            )}
            {demographics.adhd === 'yes' && demographics.autistic !== 'yes' && (
              <p><strong>ADHD:</strong> Research shows monotropic traits are also relevant to ADHD, particularly in explaining hyperfocus experiences.</p>
            )}
          </div>
        </div>
      )}

      <div className="text-center">
        <button 
          onClick={onStartOver}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
