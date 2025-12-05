import { Course, StudentData, StudyGroup } from '../types/academics';

const STORAGE_KEY = 'fuvplanner-data';

const defaultData: StudentData = {
  profile: {
    name: 'Alex Chen',
    cohort: 2027,
    major: 'Computer Science',
    minor: 'Economics',
    allowCapstone: true,
  },
  courses: [
    {
      id: 'core-gh',
      code: 'GH 101',
      title: 'Global Humanities',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'E1',
      status: 'completed',
      term: 'Fall 2023',
      grade: 'A',
      countsTowardGPA: true,
    },
    {
      id: 'core-mvcs',
      code: 'VCS 101',
      title: 'Modern Vietnamese Culture & Society',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'completed',
      term: 'Fall 2023',
      grade: 'A-',
      countsTowardGPA: true,
    },
    {
      id: 'core-dst',
      code: 'DST 101',
      title: 'Design & Systems Thinking',
      credits: 4,
      level: 100,
      categories: ['core'],
      status: 'completed',
      term: 'Spring 2024',
      grade: 'B+',
      countsTowardGPA: true,
    },
    {
      id: 'core-quest',
      code: 'QRDA 101',
      title: 'Quantitative Reasoning',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'in_progress',
      term: 'Fall 2024',
    },
    {
      id: 'major-cs1',
      code: 'CS 201',
      title: 'Data Structures & Algorithms',
      credits: 4,
      level: 200,
      categories: ['major', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'completed',
      term: 'Spring 2024',
      grade: 'B',
      countsTowardGPA: true,
    },
    {
      id: 'major-cs2',
      code: 'CS 250',
      title: 'Programming for Data Science & Visualization',
      credits: 4,
      level: 200,
      categories: ['major', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'completed',
      term: 'Spring 2024',
      grade: 'A',
      countsTowardGPA: true,
    },
    {
      id: 'major-cs3',
      code: 'CS 310',
      title: 'Databases',
      credits: 4,
      level: 300,
      categories: ['major'],
      status: 'in_progress',
      term: 'Fall 2024',
    },
    {
      id: 'major-cs4',
      code: 'CS 320',
      title: 'Machine Learning',
      credits: 4,
      level: 300,
      categories: ['major'],
      status: 'planned',
      term: 'Spring 2025',
    },
    {
      id: 'minor-1',
      code: 'ECON 101',
      title: 'Principles of Economics',
      credits: 4,
      level: 100,
      categories: ['minor', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'completed',
      term: 'Spring 2024',
      grade: 'B+',
      countsTowardGPA: true,
    },
    {
      id: 'minor-2',
      code: 'ECON 210',
      title: 'Intermediate Microeconomics',
      credits: 4,
      level: 200,
      categories: ['minor', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'planned',
      term: 'Spring 2025',
    },
    {
      id: 'exploratory-e1',
      code: 'ART 120',
      title: 'Vietnamese Art History',
      credits: 4,
      level: 100,
      categories: ['exploratory'],
      exploratoryArea: 'E1',
      status: 'completed',
      term: 'Fall 2024',
      grade: 'A',
      countsTowardGPA: true,
    },
    {
      id: 'elp-1',
      code: 'ELP 201',
      title: 'Civic Engagement Internship',
      credits: 2,
      level: 200,
      categories: ['elp'],
      status: 'in_progress',
      term: 'Fall 2024',
      countsTowardGPA: false,
    },
    {
      id: 'moet-1',
      code: 'PE 101',
      title: 'Physical Education',
      credits: 0,
      level: 100,
      categories: ['moet'],
      status: 'completed',
      term: 'Fall 2023',
      countsTowardGPA: false,
    },
  ],
  studyGroups: [
    {
      id: 'sg-1',
      courseCode: 'CS 201',
      courseName: 'Data Structures & Algorithms',
      groupName: 'Morning Study Group',
      memberCount: 5,
      maxMembers: 6,
    },
    {
      id: 'sg-2',
      courseCode: 'CS 201',
      courseName: 'Data Structures & Algorithms',
      groupName: 'Evening Coders',
      memberCount: 4,
      maxMembers: 6,
    },
    {
      id: 'sg-3',
      courseCode: 'ECON 201',
      courseName: 'Principles of Economics',
      groupName: 'Econ Study Squad',
      memberCount: 6,
      maxMembers: 6,
    },
    {
      id: 'sg-4',
      courseCode: 'ECON 201',
      courseName: 'Principles of Economics',
      groupName: 'Problem Solvers',
      memberCount: 3,
      maxMembers: 6,
    },
  ],
};

let memoryCache: StudentData | null = null;

const hasLocalStorage = typeof localStorage !== 'undefined';

function cloneData(data: StudentData): StudentData {
  return JSON.parse(JSON.stringify(data));
}

export function loadStudentData(): StudentData {
  if (hasLocalStorage) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as StudentData;
      } catch (error) {
        console.warn('Failed to parse student data, resetting to defaults', error);
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return cloneData(defaultData);
  }

  if (memoryCache) return cloneData(memoryCache);
  memoryCache = cloneData(defaultData);
  return cloneData(defaultData);
}

function persistData(data: StudentData) {
  if (hasLocalStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    memoryCache = cloneData(data);
  }
}

export function saveStudentData(data: StudentData) {
  persistData(data);
}

export function upsertCourse(course: Course) {
  const data = loadStudentData();
  const existingIndex = data.courses.findIndex((c) => c.id === course.id);
  if (existingIndex >= 0) {
    data.courses[existingIndex] = course;
  } else {
    data.courses.push(course);
  }
  persistData(data);
  return course;
}

export function updateCourseStatus(courseId: string, status: Course['status']) {
  const data = loadStudentData();
  const course = data.courses.find((c) => c.id === courseId);
  if (course) {
    course.status = status;
    persistData(data);
  }
  return course;
}

export function recordGrade(courseId: string, grade: Course['grade']) {
  const data = loadStudentData();
  const course = data.courses.find((c) => c.id === courseId);
  if (course) {
    course.grade = grade;
    persistData(data);
  }
  return course;
}

export function removeCourse(courseId: string) {
  const data = loadStudentData();
  data.courses = data.courses.filter((c) => c.id !== courseId);
  persistData(data);
}

export function listStudyGroups(): StudyGroup[] {
  const data = loadStudentData();
  return data.studyGroups;
}

export function joinStudyGroup(groupId: string) {
  const data = loadStudentData();
  data.studyGroups = data.studyGroups.map((group) =>
    group.id === groupId
      ? { ...group, memberCount: Math.min(group.maxMembers, group.memberCount + 1) }
      : group
  );
  persistData(data);
}

export function resetStudentData() {
  persistData(defaultData);
}
