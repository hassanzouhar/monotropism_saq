import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { MQItem, Responses, QuestionSection } from '../types';

interface QuestionnaireProps {
  responses: Responses;
  handleResponse: (itemId: number, value: any) => void;
  mqItems: MQItem[];
  questionSections: QuestionSection[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentStep: (step: number) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  responses,
  handleResponse,
  mqItems,
  questionSections,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setCurrentStep,
}) => {
  const [showSectionOverview, setShowSectionOverview] = useState(false);

  const getCurrentSection = () => {
    let totalItems = 0;
    for (let i = 0; i < questionSections.length; i++) {
      const section = questionSections[i];
      if (currentQuestionIndex < totalItems + section.items.length) {
        return {
          section,
          sectionIndex: i,
          itemIndexInSection: currentQuestionIndex - totalItems,
        };
      }
      totalItems += section.items.length;
    }
    return null;
  };

  const getCompletionStats = () => {
    const answered = Object.values(responses).filter(v => v !== null).length;
    const total = mqItems.length;
    const percentage = Math.round((answered / total) * 100);
    const minimumMet = answered >= 40;
    return { answered, total, percentage, minimumMet };
  };

  const navigateQuestion = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentQuestionIndex < mqItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const stats = getCompletionStats();
  const currentSectionInfo = getCurrentSection();
  const currentItem = mqItems[currentQuestionIndex];

  if (!currentSectionInfo) return null;

  const { section, sectionIndex, itemIndexInSection } = currentSectionInfo;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Monotropism Questionnaire</h2>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {mqItems.length}
            </div>
            <div className="text-xs text-gray-400">
              {stats.answered} answered • {stats.minimumMet ? '✓ Minimum met' : `Need ${40 - stats.answered} more`}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium text-blue-600">{stats.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-blue-900">{section.title}</h3>
            <span className="text-sm text-blue-700">
              Section {sectionIndex + 1} of {questionSections.length}
            </span>
          </div>
          <p className="text-sm text-blue-800 mb-3">{section.description}</p>
          <div className="flex justify-between text-xs text-blue-700">
            <span>Question {itemIndexInSection + 1} of {section.items.length} in this section</span>
            <span>{section.items.filter(id => responses[id] !== null && responses[id] !== undefined).length}/{section.items.length} completed</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((itemIndexInSection + 1) / section.items.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md">
              {currentItem.id}
            </div>
            <div className="flex-1">
              <p className="text-xl text-gray-900 leading-relaxed mb-4 font-medium">
                {currentItem.text}
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 text-xs text-center font-medium text-gray-600 mb-2">
                  <div>Strongly<br />Disagree</div>
                  <div>Disagree</div>
                  <div>Neither</div>
                  <div>Agree</div>
                  <div>Strongly<br />Agree</div>
                </div>
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label
                      key={value}
                      className={`flex flex-col items-center gap-2 cursor-pointer p-3 rounded-lg border-2 transition-all ${
                        responses[currentItem.id] === value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`item-${currentItem.id}`}
                        value={value}
                        checked={responses[currentItem.id] === value}
                        onChange={() => handleResponse(currentItem.id, value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-lg font-bold text-blue-600">{value}</span>
                    </label>
                  ))}
                </div>
                <div className="text-center">
                  <label className={`inline-flex items-center gap-2 cursor-pointer p-3 rounded-lg border-2 transition-all ${
                    responses[currentItem.id] === 'na'
                      ? 'border-gray-500 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name={`item-${currentItem.id}`}
                      value="na"
                      checked={responses[currentItem.id] === 'na'}
                      onChange={() => handleResponse(currentItem.id, 'na')}
                      className="w-4 h-4 text-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Not applicable to me</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => currentQuestionIndex === 0 ? setCurrentStep(1) : navigateQuestion('prev')}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {currentQuestionIndex === 0 ? 'Back to Background' : 'Previous Question'}
        </button>
        <div className="flex items-center gap-1">
          {mqItems.slice(Math.max(0, currentQuestionIndex - 5), Math.min(mqItems.length, currentQuestionIndex + 6)).map((item, index) => {
            const actualIndex = Math.max(0, currentQuestionIndex - 5) + index;
            const isAnswered = responses[item.id] !== null && responses[item.id] !== undefined;
            const isCurrent = actualIndex === currentQuestionIndex;
            return (
              <button
                key={item.id}
                onClick={() => goToQuestion(actualIndex)}
                className={`w-3 h-3 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-blue-600 ring-2 ring-blue-200'
                    : isAnswered
                      ? 'bg-green-400 hover:bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Question ${actualIndex + 1}${isAnswered ? ' (answered)' : ''}`}
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          {currentQuestionIndex < mqItems.length - 1 ? (
            <button
              onClick={() => navigateQuestion('next')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!stats.minimumMet}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              View Results <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-900">Section Overview</h4>
          <button
            onClick={() => setShowSectionOverview(!showSectionOverview)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            {showSectionOverview ? 'Hide' : 'Show'} All Questions
            <ChevronRight className={`w-4 h-4 transition-transform ${showSectionOverview ? 'rotate-90' : ''}`} />
          </button>
        </div>
        {showSectionOverview && (
          <div className="grid grid-cols-7 gap-1 mt-4">
            {questionSections.map((sec, secIndex) => (
              <div key={secIndex} className="space-y-1">
                <div className="text-xs text-gray-600 font-medium truncate" title={sec.title}>
                  {sec.title.split(' ')[0]}
                </div>
                <div className="grid gap-1">
                  {sec.items.map(itemId => {
                    const itemIndex = mqItems.findIndex(item => item.id === itemId);
                    const isAnswered = responses[itemId] !== null && responses[itemId] !== undefined;
                    const isCurrent = itemIndex === currentQuestionIndex;
                    return (
                      <button
                        key={itemId}
                        onClick={() => goToQuestion(itemIndex)}
                        className={`w-4 h-4 rounded text-xs transition-all ${
                          isCurrent
                            ? 'bg-blue-600 text-white ring-1 ring-blue-300'
                            : isAnswered
                              ? 'bg-green-400 text-white hover:bg-green-500'
                              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                        }`}
                        title={`Question ${itemId}${isAnswered ? ' (answered)' : ''}`}
                      >
                        {itemId}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
