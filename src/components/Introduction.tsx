import React from 'react';
import { ChevronRight, Info, AlertCircle } from 'lucide-react';

interface IntroductionProps {
  onBegin: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onBegin }) => (
  <div className="max-w-4xl mx-auto p-6 space-y-6">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Monotropism Questionnaire (MQ)</h1>
      <p className="text-lg text-gray-600">Research-validated instrument for measuring monotropic cognitive style</p>
    </div>
    
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
        <Info className="w-5 h-5" />
        About Monotropism Theory
      </h2>
      <div className="text-blue-800 space-y-3">
        <p>
          Monotropism is a theory of autism developed by autistic scholars that describes how the mind functions as an "interest-system" where attention is allocated across different interests.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Monotropic minds</strong> tend to have fewer interests highly aroused at any time, with deep focused attention ("attention tunnels")</li>
          <li><strong>Polytropic minds</strong> distribute attention across more interests simultaneously at varying levels</li>
          <li>This framework explains many autism features non-pathologically: special interests, hyperfocus, difficulty with task-switching</li>
          <li>Recent research shows monotropism is also relevant to ADHD, particularly in explaining hyperfocus experiences</li>
        </ul>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5" />
        Important Considerations
      </h3>
      <div className="text-amber-800 space-y-2">
        <p><strong>This is not a diagnostic tool.</strong> The MQ measures cognitive style, not autism or ADHD diagnosis.</p>
        <p><strong>Research context:</strong> This instrument was developed through participatory research with autistic adults.</p>
        <p><strong>Validation:</strong> Based on Garau et al. (2023) with 1,109 participants, showing strong psychometric properties.</p>
      </div>
    </div>

    <div className="text-center">
      <button 
        onClick={onBegin}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
      >
        Begin Assessment <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);
