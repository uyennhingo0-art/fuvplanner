import { RequirementConfig } from '../types/academics';

export const coreRequirements: RequirementConfig = {
  id: 'core',
  title: 'Core Curriculum',
  description: 'Complete all four core courses (16 credits total).',
  requiredCredits: 16,
  rules: [
    {
      type: 'REQUIRED_COURSES',
      courses: ['GH 101', 'VCS 101', 'DST 101', 'QRDA 101'],
    },
  ],
};

export const exploratoryRequirements: RequirementConfig = {
  id: 'exploratory',
  title: 'Exploratory Requirements',
  description: '8 credits each in Arts & Humanities, Social Sciences, and STEM plus 8 flex credits.',
  requiredCredits: 32,
  rules: [
    {
      type: 'DISTRIBUTION',
      areas: [
        { id: 'E1', credits: 8, label: 'Arts & Humanities' },
        { id: 'E2', credits: 8, label: 'Social Sciences' },
        { id: 'STEM', credits: 8, label: 'STEM' },
        { id: 'Flex', credits: 8, label: 'Any exploratory credit' },
      ],
    },
  ],
};

export const majorRequirements: RequirementConfig = {
  id: 'major',
  title: 'Major',
  description: 'Example CS major: 48 credits with at least 8 credits at 300-level and up to 8 credits double counted.',
  requiredCredits: 48,
  rules: [
    { type: 'MIN_LEVEL', level: 300, count: 2, within: ['major'] },
    { type: 'MIN_CREDITS', credits: 48, categories: ['major'] },
  ],
};

export const minorRequirements: RequirementConfig = {
  id: 'minor',
  title: 'Minor',
  description: '20 credits with at least one 300-level course.',
  requiredCredits: 20,
  rules: [
    { type: 'MIN_LEVEL', level: 300, count: 1, within: ['minor'] },
    { type: 'MIN_CREDITS', credits: 20, categories: ['minor'] },
  ],
};

export const requirementsConfig = {
  core: coreRequirements,
  exploratory: exploratoryRequirements,
  major: majorRequirements,
  minor: minorRequirements,
};
