export type CourseCategory =
  | 'core'
  | 'exploratory'
  | 'major'
  | 'minor'
  | 'elective'
  | 'capstone'
  | 'elp'
  | 'moet';

export type ExploratoryArea = 'E1' | 'E2' | 'STEM' | 'Flex';

export type CourseStatus = 'planned' | 'in_progress' | 'completed';

export type Grade =
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'F'
  | 'P'
  | 'NP';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  level: number;
  categories: CourseCategory[];
  exploratoryArea?: ExploratoryArea;
  majorArea?: string;
  minorArea?: string;
  status: CourseStatus;
  term: string;
  grade?: Grade;
  countsTowardGPA?: boolean;
}

export interface StudentProfile {
  name: string;
  cohort: number;
  major?: string;
  minor?: string;
  allowCapstone: boolean;
}

export interface StudyGroup {
  id: string;
  courseCode: string;
  courseName: string;
  groupName: string;
  memberCount: number;
  maxMembers: number;
}

export interface StudentData {
  profile: StudentProfile;
  courses: Course[];
  studyGroups: StudyGroup[];
}

export interface RequirementProgress {
  completed: number;
  required: number;
  status: 'complete' | 'in_progress' | 'not_started';
  details?: Record<string, number>;
  notes?: string[];
}

export interface AcademicProgressSummary {
  totalCredits: number;
  totalRequirement: number;
  gpa?: number;
  gradedCourseCount: number;
  courseCount: number;
  core: RequirementProgress;
  exploratory: RequirementProgress & {
    areaCredits: Record<ExploratoryArea, number>;
  };
  major: RequirementProgress & {
    upperLevel: number;
    doubleCounted: number;
  };
  minor?: RequirementProgress;
  elp: RequirementProgress;
  capstoneEligible: boolean;
}
