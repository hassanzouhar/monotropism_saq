import React, { useState } from 'react';
import { ChevronRight, BookOpen, BarChart3, User } from 'lucide-react';
import { calculateScore, calculateFactorScores } from './utils/calculations';
import { Introduction, Background, Questionnaire, Results } from './components';
import { ResponseValue, Responses, Demographics } from './types';
import { mqItems, questionSections, factorStructure } from './data';

const MonotropismQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [demographics, setDemographics] = useState<Demographics>({
    autistic: null,
    adhd: null,
    age: '',
    education: ''
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleResponse = (itemId: number, value: ResponseValue) => {
    setResponses(prev => ({
      ...prev,
      [itemId]: value
    }));
    
    if (currentQuestionIndex < mqItems.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  

  const handleStartOver = () => {
    setCurrentStep(0);
    setResponses({});
    setDemographics({ autistic: null, adhd: null, age: '', education: '' });
    setCurrentQuestionIndex(0);
  };

  const steps = [
    { title: "Introduction", icon: BookOpen },
    { title: "Background", icon: User },
    { title: "Questionnaire", icon: BarChart3 },
    { title: "Results", icon: ChevronRight }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center gap-2 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${isCompleted ? 'bg-green-300' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-8">
        {currentStep === 0 && <Introduction onBegin={() => setCurrentStep(1)} />}
        {currentStep === 1 && (
          <Background
            demographics={demographics}
            setDemographics={setDemographics}
            onBack={() => setCurrentStep(0)}
            onContinue={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 2 && (
          <Questionnaire
            responses={responses}
            handleResponse={handleResponse}
            mqItems={mqItems}
            questionSections={questionSections}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <Results
            totalScore={calculateScore(responses, mqItems)}
            factorScores={calculateFactorScores(responses, mqItems, factorStructure)}
            demographics={demographics}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
};

export default MonotropismQuestionnaire;
