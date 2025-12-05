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
  | 'NP'
  | null;

export interface Course {
  id: string;
  courseCode: string;
  /**
   * Compatibility alias for older datasets that used `code` instead of `courseCode`.
   * New code should prefer `courseCode`, but we keep this optional field so data
   * imported from another branch still loads without breaking.
   */
  code?: string;
  title: string;
  credits: number;
  level: number;
  categories: CourseCategory[];
  category?: CourseCategory; // legacy single category
  exploratoryArea?: ExploratoryArea;
  majorTags?: string[];
  minorTags?: string[];
  term?: string;
  year?: number;
  days?: string;
  startTime?: string;
  endTime?: string;
  instructor?: string;
  room?: string;
  crossListedWith?: string[];
  status: CourseStatus;
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

export type RequirementRule =
  | { type: 'REQUIRED_COURSES'; courses: string[] }
  | { type: 'MIN_CREDITS'; credits: number; categories?: CourseCategory[] }
  | { type: 'MIN_COURSES_FROM_SET'; count: number; courses: string[] }
  | { type: 'MIN_CREDITS_FROM_SET'; credits: number; courses: string[] }
  | { type: 'MIN_LEVEL'; level: number; count: number; within?: CourseCategory[] }
  | { type: 'DISTRIBUTION'; areas: { id: string; credits: number; label: string }[] };

export interface RequirementConfig {
  id: string;
  title: string;
  description?: string;
  requiredCredits: number;
  rules: RequirementRule[];
}
