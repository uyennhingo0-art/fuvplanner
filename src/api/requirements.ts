import {
  AcademicProgressSummary,
  Course,
  ExploratoryArea,
  RequirementProgress,
  StudentProfile,
} from '../types/academics';

const GRADE_POINTS: Record<string, number> = {
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  F: 0,
};

const CORE_REQUIREMENTS = [
  'Global Humanities',
  'Modern Vietnamese Culture & Society',
  'Design & Systems Thinking',
  'Quantitative Reasoning',
  'Scientific Inquiry',
  'Intro to Statistics',
  'Programming for Data Science & Visualization',
];

function creditSum(courses: Course[]) {
  return courses.reduce((total, course) => total + course.credits, 0);
}

function courseCountsTowardCredits(course: Course) {
  return !course.categories.includes('moet');
}

function calculateGPA(courses: Course[]) {
  const graded = courses.filter(
    (course) =>
      course.grade &&
      GRADE_POINTS[course.grade] !== undefined &&
      course.countsTowardGPA !== false
  );

  const totals = graded.reduce(
    (acc, course) => {
      const gradePoint = GRADE_POINTS[course.grade ?? ''];
      if (gradePoint === undefined) return acc;
      acc.qualityPoints += gradePoint * course.credits;
      acc.creditsAttempted += course.credits;
      return acc;
    },
    { qualityPoints: 0, creditsAttempted: 0 }
  );

  if (totals.creditsAttempted === 0) return undefined;
  return Number((totals.qualityPoints / totals.creditsAttempted).toFixed(2));
}

function coreProgress(courses: Course[]): RequirementProgress {
  const coreCourses = courses.filter((course) => course.categories.includes('core'));
  const completedCredits = creditSum(coreCourses.filter((course) => course.status === 'completed'));
  const requiredCredits = 16;
  const status = completedCredits >= requiredCredits ? 'complete' : completedCredits > 0 ? 'in_progress' : 'not_started';

  const missingCourses = CORE_REQUIREMENTS.filter(
    (name) => !coreCourses.some((course) => course.title.includes(name) && course.status === 'completed')
  );

  return {
    completed: completedCredits,
    required: requiredCredits,
    status,
    notes: missingCourses,
  };
}

function exploratoryProgress(courses: Course[]): RequirementProgress & { areaCredits: Record<ExploratoryArea, number> } {
  const exploratoryCourses = courses.filter((course) => course.categories.includes('exploratory'));
  const areaCredits: Record<ExploratoryArea, number> = {
    E1: 0,
    E2: 0,
    STEM: 0,
    Flex: 0,
  };

  exploratoryCourses.forEach((course) => {
    if (course.exploratoryArea && areaCredits[course.exploratoryArea] !== undefined) {
      areaCredits[course.exploratoryArea] += course.credits;
    } else {
      areaCredits.Flex += course.credits;
    }
  });

  const completedCredits = Object.values(areaCredits).reduce((total, value) => total + value, 0);
  const requiredCredits = 32;
  const status = completedCredits >= requiredCredits ? 'complete' : completedCredits > 0 ? 'in_progress' : 'not_started';

  const notes = [
    areaCredits.E1 < 8 ? `Need ${8 - areaCredits.E1} more credits in Arts & Humanities` : null,
    areaCredits.E2 < 8 ? `Need ${8 - areaCredits.E2} more credits in Social Sciences` : null,
    areaCredits.STEM < 8 ? `Need ${8 - areaCredits.STEM} more credits in STEM` : null,
  ].filter(Boolean) as string[];

  return {
    completed: completedCredits,
    required: requiredCredits,
    status,
    areaCredits,
    notes,
  };
}

function majorProgress(courses: Course[]): RequirementProgress & { upperLevel: number; doubleCounted: number } {
  const majorCourses = courses.filter((course) => course.categories.includes('major'));
  const completedMajor = majorCourses.filter((course) => course.status === 'completed');
  const upperLevel = completedMajor.filter((course) => course.level >= 300).length * 4;

  const overlappingCredits = completedMajor.reduce((total, course) => {
    const overlaps = course.categories.filter((category) => ['exploratory', 'minor'].includes(category));
    if (overlaps.length > 0) {
      return total + course.credits;
    }
    return total;
  }, 0);

  const doubleCounted = Math.min(8, overlappingCredits);
  const completedCredits = creditSum(completedMajor);
  const requiredCredits = 48;
  const status = completedCredits >= requiredCredits ? 'complete' : completedCredits > 0 ? 'in_progress' : 'not_started';

  return {
    completed: completedCredits,
    required: requiredCredits,
    status,
    upperLevel,
    doubleCounted,
  };
}

function minorProgress(courses: Course[]): RequirementProgress {
  const minorCourses = courses.filter((course) => course.categories.includes('minor'));
  const completedMinor = minorCourses.filter((course) => course.status === 'completed');
  const requiredCredits = 20;
  const completedCredits = creditSum(completedMinor);
  const status = completedCredits >= requiredCredits ? 'complete' : completedCredits > 0 ? 'in_progress' : 'not_started';

  const advancedCount = completedMinor.filter((course) => course.level >= 300).length;
  const notes = advancedCount < 1 ? ['Need at least one 300-level minor course'] : [];

  return {
    completed: completedCredits,
    required: requiredCredits,
    status,
    notes,
  };
}

function elpProgress(courses: Course[], cohort: number): RequirementProgress {
  const elpCourses = courses.filter((course) => course.categories.includes('elp'));
  const completedCredits = creditSum(elpCourses.filter((course) => course.status === 'completed'));
  const inProgressCredits = creditSum(elpCourses.filter((course) => course.status === 'in_progress'));
  const requiredCredits = cohort >= 2029 ? 0 : 4;
  const creditsCounted = completedCredits + inProgressCredits;
  const status = creditsCounted >= requiredCredits ? 'complete' : creditsCounted > 0 ? 'in_progress' : 'not_started';

  const notes = cohort >= 2029 && creditsCounted === 0 ? ['Complete the ELP milestone (non-credit)'] : [];

  return {
    completed: creditsCounted,
    required: requiredCredits,
    status,
    notes,
  };
}

export function computeAcademicProgress(courses: Course[], profile: StudentProfile): AcademicProgressSummary {
  const countableCourses = courses.filter(courseCountsTowardCredits);
  const totalCredits = creditSum(countableCourses.filter((course) => course.status !== 'planned'));
  const gpa = calculateGPA(countableCourses);
  const courseCount = courses.length;
  const gradedCourseCount = courses.filter((course) => course.grade).length;

  const core = coreProgress(courses);
  const exploratory = exploratoryProgress(courses);
  const major = majorProgress(courses);
  const minor = profile.minor ? minorProgress(courses) : undefined;
  const elp = elpProgress(courses, profile.cohort);

  const capstoneEligible = totalCredits >= 80 && major.completed >= 32 && profile.allowCapstone;

  return {
    totalCredits,
    totalRequirement: 128,
    gpa,
    courseCount,
    gradedCourseCount,
    core,
    exploratory,
    major,
    minor,
    elp,
    capstoneEligible,
  };
}
