import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ProgressBar } from './ProgressBar';

interface RequirementBlockProps {
  title: string;
  requiredCredits: number;
  completedCredits: number;
  description?: string;
  rules?: string[];
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

export function RequirementBlock({
  title,
  requiredCredits,
  completedCredits,
  description,
  rules,
  children,
  defaultExpanded = false,
}: RequirementBlockProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              {completedCredits}/{requiredCredits} credits
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
        <ProgressBar current={completedCredits} total={requiredCredits} />
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {description && <p className="text-sm text-gray-600 mt-3 mb-3">{description}</p>}

          {rules && rules.length > 0 && (
            <div className="bg-secondary bg-opacity-30 rounded p-3 mb-3">
              <p className="text-xs font-semibold text-primary mb-2">Requirements:</p>
              <ul className="space-y-1">
                {rules.map((rule, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {children && <div className="mt-3 space-y-2">{children}</div>}
        </div>
      )}
    </div>
  );
}
