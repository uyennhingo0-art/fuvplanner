interface FlowchartNodeProps {
  code: string;
  title: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'capstone';
  credits: number;
  status?: 'planned' | 'in_progress' | 'completed';
  onClick?: () => void;
}

export function FlowchartNode({ code, title, level, credits, status, onClick }: FlowchartNodeProps) {
  const levelStyles = {
    foundation: 'bg-blue-100 border-blue-300 text-blue-900',
    intermediate: 'bg-green-100 border-green-300 text-green-900',
    advanced: 'bg-amber-100 border-amber-300 text-amber-900',
    capstone: 'bg-purple-100 border-purple-300 text-purple-900',
  };

  const statusDotColors = {
    planned: 'bg-gray-400',
    in_progress: 'bg-yellow-400',
    completed: 'bg-green-500',
  };

  return (
    <div
      onClick={onClick}
      className={`relative border-2 rounded-lg p-3 min-w-[140px] max-w-[160px] ${levelStyles[level]} ${onClick ? 'cursor-pointer hover:shadow-md' : ''} transition-shadow`}
    >
      {status && (
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusDotColors[status]} border-2 border-white`} />
      )}
      <div className="text-xs font-bold mb-1">{code}</div>
      <div className="text-xs leading-tight mb-2 line-clamp-2">{title}</div>
      <div className="text-xs font-semibold">{credits} cr</div>
    </div>
  );
}
