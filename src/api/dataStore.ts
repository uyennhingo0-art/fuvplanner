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
      courseCode: 'GH 101',
      title: 'Global Humanities',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'E1',
      status: 'completed',
      term: 'Fall',
      year: 2023,
      grade: 'A',
      countsTowardGPA: true,
      days: 'Mon/Wed',
      startTime: '09:00',
      endTime: '10:15',
      instructor: 'Dr. Tran',
      room: 'A201',
    },
    {
      id: 'core-mvcs',
      courseCode: 'VCS 101',
      title: 'Modern Vietnamese Culture & Society',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'completed',
      term: 'Fall',
      year: 2023,
      grade: 'A-',
      countsTowardGPA: true,
      instructor: 'Prof. Le',
      days: 'Tue/Thu',
      startTime: '10:30',
      endTime: '11:45',
    },
    {
      id: 'core-dst',
      courseCode: 'DST 101',
      title: 'Design & Systems Thinking',
      credits: 4,
      level: 100,
      categories: ['core'],
      status: 'completed',
      term: 'Spring',
      year: 2024,
      grade: 'B+',
      countsTowardGPA: true,
    },
    {
      id: 'core-quest',
      courseCode: 'QRDA 101',
      title: 'Quantitative Reasoning',
      credits: 4,
      level: 100,
      categories: ['core', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'in_progress',
      term: 'Fall',
      year: 2024,
    },
    {
      id: 'major-cs1',
      courseCode: 'CS 201',
      title: 'Data Structures & Algorithms',
      credits: 4,
      level: 200,
      categories: ['major', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'completed',
      term: 'Spring',
      year: 2024,
      grade: 'B',
      countsTowardGPA: true,
      majorTags: ['CS'],
    },
    {
      id: 'major-cs2',
      courseCode: 'CS 250',
      title: 'Programming for Data Science & Visualization',
      credits: 4,
      level: 200,
      categories: ['major', 'exploratory'],
      exploratoryArea: 'STEM',
      status: 'completed',
      term: 'Spring',
      year: 2024,
      grade: 'A',
      countsTowardGPA: true,
      majorTags: ['CS'],
    },
    {
      id: 'major-cs3',
      courseCode: 'CS 310',
      title: 'Databases',
      credits: 4,
      level: 300,
      categories: ['major'],
      status: 'in_progress',
      term: 'Fall',
      year: 2024,
      majorTags: ['CS'],
    },
    {
      id: 'major-cs4',
      courseCode: 'CS 320',
      title: 'Machine Learning',
      credits: 4,
      level: 300,
      categories: ['major'],
      status: 'planned',
      term: 'Spring',
      year: 2025,
      majorTags: ['CS'],
    },
    {
      id: 'minor-1',
      courseCode: 'ECON 101',
      title: 'Principles of Economics',
      credits: 4,
      level: 100,
      categories: ['minor', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'completed',
      term: 'Spring',
      year: 2024,
      grade: 'B+',
      countsTowardGPA: true,
      minorTags: ['ECON'],
    },
    {
      id: 'minor-2',
      courseCode: 'ECON 210',
      title: 'Intermediate Microeconomics',
      credits: 4,
      level: 200,
      categories: ['minor', 'exploratory'],
      exploratoryArea: 'E2',
      status: 'planned',
      term: 'Spring',
      year: 2025,
      minorTags: ['ECON'],
    },
    {
      id: 'exploratory-e1',
      courseCode: 'ART 120',
      title: 'Vietnamese Art History',
      credits: 4,
      level: 100,
      categories: ['exploratory'],
      exploratoryArea: 'E1',
      status: 'completed',
      term: 'Fall',
      year: 2024,
      grade: 'A',
      countsTowardGPA: true,
    },
    {
      id: 'elp-1',
      courseCode: 'ELP 201',
      title: 'Civic Engagement Internship',
      credits: 2,
      level: 200,
      categories: ['elp'],
      status: 'in_progress',
      term: 'Fall',
      year: 2024,
      countsTowardGPA: false,
    },
    {
      id: 'moet-1',
      courseCode: 'PE 101',
      title: 'Physical Education',
      credits: 0,
      level: 100,
      categories: ['moet'],
      status: 'completed',
      term: 'Fall',
      year: 2023,
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

export const courseTemplateHeader =
  'courseCode,title,credits,category,term,year,days,startTime,endTime,instructor,room,majorTags,minorTags,exploratoryArea,crossListedWith,status,grade';

export function getCourseTemplateCsv() {
  const sampleRow =
    'CS 201,Data Structures & Algorithms,4,major,Spring,2025,Mon/Wed,09:00,10:15,Dr. Tran,A201,"CS","","STEM","",planned,';
  return `${courseTemplateHeader}\n${sampleRow}`;
}

export function parseCsv(content: string): Course[] {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const [header, ...rows] = lines;
  const columns = header.split(',');
  const requiredColumns = ['courseCode', 'title', 'credits', 'term', 'year'];
  for (const col of requiredColumns) {
    if (!columns.includes(col)) {
      throw new Error(`Missing required column: ${col}`);
    }
  }

  return rows.map((row, index) => {
    const cells = row.split(',');
    const cellMap: Record<string, string> = {};
    columns.forEach((col, i) => {
      cellMap[col] = cells[i]?.replace(/^"|"$/g, '') ?? '';
    });

    const baseId = `${cellMap.courseCode || 'course'}-${index}`;

    return {
      id: baseId,
      courseCode: cellMap.courseCode,
      title: cellMap.title,
      credits: Number(cellMap.credits) || 0,
      level: 100,
      categories: cellMap.category ? [cellMap.category as Course['categories'][number]] : ['elective'],
      exploratoryArea: (cellMap.exploratoryArea as Course['exploratoryArea']) || undefined,
      majorTags: cellMap.majorTags ? cellMap.majorTags.split(';').filter(Boolean) : undefined,
      minorTags: cellMap.minorTags ? cellMap.minorTags.split(';').filter(Boolean) : undefined,
      term: cellMap.term,
      year: Number(cellMap.year) || undefined,
      days: cellMap.days,
      startTime: cellMap.startTime,
      endTime: cellMap.endTime,
      instructor: cellMap.instructor,
      room: cellMap.room,
      crossListedWith: cellMap.crossListedWith
        ? cellMap.crossListedWith.split(';').filter(Boolean)
        : undefined,
      status: (cellMap.status as Course['status']) || 'planned',
      grade: (cellMap.grade as Course['grade']) || null,
      countsTowardGPA: cellMap.category !== 'moet',
    };
  });
}

export function importCourses(courses: Course[]) {
  const data = loadStudentData();
  const existingIds = new Set(data.courses.map((c) => c.id));
  courses.forEach((course) => {
    const id = existingIds.has(course.id) ? `${course.id}-${Date.now()}` : course.id;
    data.courses.push({ ...course, id });
  });
  persistData(data);
  return data.courses;
}
