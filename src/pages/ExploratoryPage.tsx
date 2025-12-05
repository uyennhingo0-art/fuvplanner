import { RequirementBlock } from '../components/RequirementBlock';
import { AlertBanner } from '../components/AlertBanner';

export function ExploratoryPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Exploratory Requirements</h1>
      <p className="text-gray-600 mb-4">
        Complete 8 credits in each of three areas: Arts, Social Sciences, and STEM
      </p>
      <AlertBanner
        type="warning"
        message="Up to 8 credits from Exploratory can count toward your major if they overlap"
        dismissible
      />

      <div className="space-y-6 mt-6">
        <RequirementBlock
          title="E1: Arts & Humanities"
          requiredCredits={8}
          completedCredits={8}
          description="Literature, Art History, Philosophy, Music"
          rules={['8 credits required', 'Can overlap with major', 'Must be outside main field']}
          defaultExpanded
        />

        <RequirementBlock
          title="E2: Social Sciences"
          requiredCredits={8}
          completedCredits={4}
          description="Economics, Psychology, Sociology, Political Science"
          rules={['8 credits required', 'Can overlap with major']}
        >
          <AlertBanner
            type="info"
            message="You need 4 more credits. Consider PSY 201 or SOC 101 next semester"
          />
        </RequirementBlock>

        <RequirementBlock
          title="E3: STEM"
          requiredCredits={8}
          completedCredits={8}
          description="Biology, Chemistry, Physics, Computer Science, Math"
          rules={['8 credits required', 'Can overlap with major']}
        />
      </div>

      <div className="mt-8 bg-secondary bg-opacity-30 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-2">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-gray-600">Required</p><p className="text-2xl font-bold text-primary">24</p></div>
          <div><p className="text-gray-600">Completed</p><p className="text-2xl font-bold text-green-600">20</p></div>
          <div><p className="text-gray-600">In Progress</p><p className="text-2xl font-bold text-yellow-600">4</p></div>
          <div><p className="text-gray-600">Remaining</p><p className="text-2xl font-bold text-gray-600">0</p></div>
        </div>
      </div>
    </div>
  );
}
