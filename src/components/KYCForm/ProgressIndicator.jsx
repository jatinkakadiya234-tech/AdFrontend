import React from 'react';
import { Check } from 'lucide-react';

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="relative px-10 pt-8 pb-5">
      {/* Connection Line */}
      <div className="absolute top-[3.25rem] left-10 right-10 h-0.5 bg-gray-200" />
      
      <div className="flex justify-between relative z-10">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 mb-2 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
                    : 'bg-white border-3 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium text-center transition-colors duration-300 ${
                  isActive || isCompleted
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;