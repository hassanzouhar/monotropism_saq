import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Demographics } from '../types';

interface BackgroundProps {
  demographics: Demographics;
  setDemographics: React.Dispatch<React.SetStateAction<Demographics>>;
  onBack: () => void;
  onContinue: () => void;
}

export const Background: React.FC<BackgroundProps> = ({ demographics, setDemographics, onBack, onContinue }) => (
  <div className="max-w-2xl mx-auto p-6 space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Background Information</h2>
    <p className="text-gray-600">This information helps contextualize your results according to the validation research.</p>
    
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Do you identify as autistic? (This includes clinical diagnosis, self-identification, or suspecting you might be autistic)
        </label>
        <div className="space-y-2">
          {['yes', 'no', 'unsure'].map(option => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="autistic"
                value={option}
                checked={demographics.autistic === option}
                onChange={(e) => setDemographics(prev => ({ ...prev, autistic: e.target.value as 'yes' | 'no' | 'unsure' }))}
                className="w-4 h-4 text-blue-600"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Do you have ADHD? (This includes clinical diagnosis, self-identification, or suspecting you might have ADHD)
        </label>
        <div className="space-y-2">
          {['yes', 'no', 'unsure'].map(option => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="adhd"
                value={option}
                checked={demographics.adhd === option}
                onChange={(e) => setDemographics(prev => ({ ...prev, adhd: e.target.value as 'yes' | 'no' | 'unsure' }))}
                className="w-4 h-4 text-blue-600"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Age (optional)</label>
        <input
          type="number"
          value={demographics.age}
          onChange={(e) => setDemographics(prev => ({ ...prev, age: e.target.value }))}
          className="border border-gray-300 rounded-md px-3 py-2 w-24"
          min="18"
          max="120"
        />
      </div>
    </div>

    <div className="flex gap-4 justify-between">
      <button 
        onClick={onBack}
        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <button 
        onClick={onContinue}
        disabled={!demographics.autistic || !demographics.adhd}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
      >
        Continue <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);
