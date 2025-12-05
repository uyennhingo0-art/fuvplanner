import { CourseCard } from '../components/CourseCard';
import { RequirementBlock } from '../components/RequirementBlock';
import { Course } from '../types';

export function CorePage() {
  const ghCourses: Course[] = [
    {
      id: '1',
      code: 'GH 101',
      title: 'Critical Reading and Writing',
      credits: 4,
      level: 'foundation',
      category: 'core',
      prerequisites: [],
      status: 'completed',
      grade: 'A',
    },
    {
      id: '2',
      code: 'GH 201',
      title: 'Global Humanities I',
      credits: 4,
      level: 'intermediate',
      category: 'core',
      prerequisites: [],
      status: 'completed',
      grade: 'A-',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Core Curriculum</h1>
      <p className="text-gray-600 mb-6">
        Foundation courses in critical thinking, communication, and interdisciplinary learning
      </p>

      <div className="space-y-6">
        <RequirementBlock
          title="Global Humanities"
          requiredCredits={12}
          completedCredits={8}
          description="Explore major works and ideas across global civilizations"
          rules={['Complete GH 101, GH 201, and GH 202 in sequence', 'Each is prerequisite for next']}
          defaultExpanded
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ghCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </RequirementBlock>

        <RequirementBlock
          title="Modern Vietnamese Culture & Society"
          requiredCredits={8}
          completedCredits={4}
          description="Contemporary Vietnam through historical and cultural lenses"
          rules={['Must complete MV 101 and MV 201']}
        />

        <RequirementBlock
          title="Design & Systems Thinking"
          requiredCredits={4}
          completedCredits={4}
          description="Introduction to design thinking and systems analysis"
          rules={['One 4-credit course required']}
        />

        <RequirementBlock
          title="QUEST"
          requiredCredits={8}
          completedCredits={8}
          description="Quantitative reasoning and scientific inquiry"
          rules={['Choose 2 courses from QRDA, SI, or Stats']}
        />
      </div>

      <div className="mt-8 bg-secondary bg-opacity-30 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-2">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-gray-600">Required</p><p className="text-2xl font-bold text-primary">32</p></div>
          <div><p className="text-gray-600">Completed</p><p className="text-2xl font-bold text-green-600">28</p></div>
          <div><p className="text-gray-600">In Progress</p><p className="text-2xl font-bold text-yellow-600">4</p></div>
          <div><p className="text-gray-600">Remaining</p><p className="text-2xl font-bold text-gray-600">0</p></div>
        </div>
      </div>
    </div>
  );
}
