import { RequirementBlock } from '../components/RequirementBlock';

export function MinorPage() {
  const minors = [
    {
      name: 'Biophysical Sciences (BPS)',
      description: 'Interdisciplinary study combining biology, physics, and chemistry',
    },
    {
      name: 'East Asian Studies (EAS)',
      description: 'History, culture, and contemporary issues of East Asia',
    },
    {
      name: 'Gender & Sexuality Studies (GSS)',
      description: 'Critical examination of gender and sexuality across disciplines',
    },
    {
      name: 'Science, Technology & Society (STS)',
      description: 'How science and technology shape society',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Minor Requirements</h1>
      <p className="text-gray-600 mb-6">
        Choose a minor to complement your major and broaden your experience. All minors require 20 credits.
      </p>

      <div className="space-y-6">
        {minors.map((minor, index) => (
          <RequirementBlock
            key={index}
            title={minor.name}
            requiredCredits={20}
            completedCredits={0}
            description={minor.description}
            rules={[
              'Complete intro course (4 credits)',
              'Complete 12 credits of intermediate courses',
              'Complete 4 credits of advanced courses (300-level)',
            ]}
          />
        ))}
      </div>

      <div className="mt-8 bg-secondary bg-opacity-30 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-3">Minor Requirements Summary</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><p className="text-gray-600">Total Required</p><p className="text-xl font-bold text-primary">20</p></div>
            <div><p className="text-gray-600">Intro</p><p className="text-xl font-bold text-primary">4</p></div>
            <div><p className="text-gray-600">Intermediate</p><p className="text-xl font-bold text-primary">12</p></div>
            <div><p className="text-gray-600">Advanced (300+)</p><p className="text-xl font-bold text-primary">4</p></div>
          </div>
          <p className="text-sm text-gray-700 border-t border-gray-300 pt-3">
            <span className="font-semibold">Note:</span> A minor is optional but recommended. Courses cannot double-count toward major requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
