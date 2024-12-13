export const BENZODIAZEPINES = [
  {
    name: 'Diazepam',
    halfLife: 48,
    psychoactiveHours: 6,
    commonDoses: [2, 5, 10],
    units: 'mg'
  },
  {
    name: 'Alprazolam',
    halfLife: 15,
    psychoactiveHours: 4,
    commonDoses: [0.25, 0.5, 1, 2],
    units: 'mg'
  },
  {
    name: 'Clonazepam',
    halfLife: 40,
    psychoactiveHours: 8,
    commonDoses: [0.25, 0.5, 1, 2],
    units: 'mg'
  }
];

export const findMedication = (name) => 
  BENZODIAZEPINES.find(med => med.name === name); 