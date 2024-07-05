import { genders, races, ethnicities } from './lib/generalOptions.json';
// Credit to https://github.com/acmutd/hackportal/tree/develop/public for being
// the source of the json files below.
import schools from './lib/schools.json';
import majors from './lib/majors.json';

type InputBase = {
  name: string;
  label: string;
  required: boolean;
  placeholder?: string;
};

type TextInput = InputBase & {
  type: 'text';
  initialValue: string;
  pattern?: string;
};

type NumberInput = InputBase & {
  type: 'number';
  max?: number;
  min?: number;
  pattern?: string;
};

type TextAreaInput = InputBase & {
  type: 'textarea',
  rows?: number;
};

type Option = {
  name: string;
  value: string;
};

type SelectInput = InputBase & {
  type: 'select';
  options: Option[];
};

type RadioInput = InputBase & {
  type: 'radio';
  options: Option[];
}

type RegistrationQuestion =
  | TextInput
  | NumberInput
  | TextAreaInput
  | SelectInput
  | RadioInput;

type RegistrationQuestionGroup = {
  name: string;
  title: string;
  questions: RegistrationQuestion[];
}

export const registrationFormContent: RegistrationQuestionGroup[] = [
  {
    name: "general",
    title: "General",
    questions: [
      {
        type: 'text',
        name: 'firstName',
        label: 'First Name',
        required: true,
        initialValue: ''
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Last Name',
        required: true,
        initialValue: ''
      },
      {
        type: 'number',
        name: 'age',
        label: 'Age',
        required: true,
        min: 14,
        max: 100,
        pattern: '[0-9]+'
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Gender',
        required: true,
        options: genders
      }, 
      {
        type: 'select',
        name: 'race',
        label: 'Race',
        required: true,
        options: races
      },
      {
        type: 'select',
        name: 'ethnicity',
        label: 'Ethnicity',
        required: true,
        options: ethnicities
      }
    ]
  },
  {
    name: "schooling",
    title: "School",
    questions: [
      {
        type: 'select',
        name: 'university',
        label: 'This event is open to all schools. Which do you attend?',
        required: true,
        options: schools.map(s => ({
          name: s,
          value: s
        }))
      },
      {
        type: 'text',
        name: 'universityOther',
        label: 'If you selected "Other" in the list above, what institution do you attend?',
        required: false,
        initialValue: 'Enter a institutiuon name (optional).'
      },
      {
        type: 'select',
        name: 'major',
        label: 'All majors are welcome! What is your major?',
        required: true,
        options: majors.map(m => ({
          name: m,
          value: m
        }))
      },
      {
        type: 'select',
        name: 'levelOfStudy',
        label: 'Current level of study',
        required: true,
        options: [
          { name: 'freshman', value: 'Freshman' },
          { name: 'sophomore', value: 'Sophomore' },
          { name: 'junior', value: 'Junior' },
          { name: 'senior', value: 'Senior' },
          { name: 'graduate', value: 'Graduate Student' }
        ]
      }
    ]
  },
  {
    name: 'experience',
    title: 'Experience',
    questions: [
      {
        type: 'number',
        name: 'numPrevHackathons',
        label: 'How many hackathons have you attended before?',
        required: true,
        min: 0,
        max: 255,
      },
      {
        type: 'select',
        name: 'softwareExperience',
        label: 'Relative software-building experience',
        required: true,
        options: [
          { name: 'beginner', value: 'Beginner' },
          { name: 'intermediate', value: 'Intermediate' },
          { name: 'advanced', value: 'Advanced' },
          { name: 'expert', value: 'Expert' },
        ]
      }
    ]
  },
  {
    name: 'eventQuestions',
    title: 'Event-Specific Questions',
    questions: [
      {
        type: 'select',
        name: 'heardFrom',
        label: 'Where did you hear about us?',
        required: true,
        options: [
          { name: 'instagram', value: 'Instagram' },
          { name: 'x', value: 'X (Twitter)' },
          { name: 'eventSite', value: 'Event Site' },
          { name: 'friend', value: 'Friend' },
          { name: 'other', value: 'Other' },
        ]
      },
      {
        type: 'select',
        name: 'shirtSize',
        label: 'Shirt Size',
        required: true,
        options: [
          { name: 's', value: 'Small' },
          { name: 'm', value: 'Medium' },
          { name: 'l', value: 'Large' },
          { name: 'xl', value: 'Extra Large' },
        ]
      },
      {
        type: 'radio',
        name: 'dietaryRestrictions',
        label: 'Allergies / Dietary Restrictions:',
        required: true,
        options: [
          { name: 'vegan', value: 'Vegan' },
          { name: 'vegetarian', value: 'Vegetarian' },
          { name: 'nuts', value: 'Nuts' },
          { name: 'fish', value: 'Fish' },
          { name: 'wheat', value: 'Wheat' },
          { name: 'dairy', value: 'Dairy' },
          { name: 'eggs', value: 'Eggs' },
          { name: 'other', value: 'Other' },
        ]
      },
      {
        type: 'textarea',
        name: 'allergies',
        label: 'Other Allergies or Dietary Restrictions',
        required: false,
        rows: 4,
        placeholder: 'Please list any specific allergies or dietary restrictions here',
      },
      {
        type: 'textarea',
        name: 'accomodations',
        label: 'Is there anything else we can do to better accomodate you at our hackathon?',
        required: false,
        rows: 4,
        placeholder: 'List any accessibility concerns here',
      },
    ]
  },
  {
    name: 'sponsorship',
    title: 'Questions from our Sponsors',
    questions: [
      {
        type: 'text',
        name: 'github',
        label: 'GitHub',
        required: false,
        initialValue: ''
      },
      {
        type: 'text',
        name: 'linkedin',
        label: 'LinkedIn',
        required: false,
        initialValue: ''
      },
      {
        type: 'text',
        name: 'personalSite',
        label: 'Personal Website',
        required: false,
        initialValue: ''
      },
      {
        type: 'radio',
        name: 'companies',
        label: 'Companies you may send my resume to',
        required: false,
        options: []
      }
    ]
  }
];

type RegistrationValue = string | Array<string> | number;

export interface StatefulRegistrationI {
  general: {
    firstName: RegistrationValue,
    lastName: RegistrationValue,
    age: RegistrationValue,
    gender: RegistrationValue,
    race: RegistrationValue,
    ethnicity: RegistrationValue
  },
  schooling: {
    university: RegistrationValue,
    universityOther: RegistrationValue,
    major: RegistrationValue,
    levelOfStudy: RegistrationValue,
  },
  experience: {
    numPrevHackathons: RegistrationValue,
    softwareExperience: RegistrationValue,
  },
  eventQuestions: {
    heardFrom: RegistrationValue,
    shirtSize: RegistrationValue,
    dietaryRestrictions: RegistrationValue,
    allergies: RegistrationValue,
    accomodations: RegistrationValue,
  },
  sponsorship: {
    github: RegistrationValue,
    linkedin: RegistrationValue,
    personalSite: RegistrationValue,
    companies: RegistrationValue,
  }
}
