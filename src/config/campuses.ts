export interface CampusGroup {
  id: string;
  name: string;
  campuses: string[];
}

export const CAMPUS_GROUPS: CampusGroup[] = [
  {
    id: 'public-universities',
    name: 'Public Universities',
    campuses: [
      'UG', 'KNUST', 'UCC', 'UEW', 'UDS', 'UPSA', 'UMaT', 'UHAS', 'UENR', 
      'UESD', 'GCTU', 'AAMUSTED', 'CK-TU', 'SDD-UBIDS', 'UniMAC'
    ]
  },
  {
    id: 'private-universities',
    name: 'Private Universities',
    campuses: [
      'ASHESI', 'CU', 'VVU', 'WIUC', 'REGENT', 'KUC', 'PUC', 'CSUC', 
      'GCUC', 'LUC', 'OIC', 'WUG', 'UCG'
    ]
  },
  {
    id: 'technical-universities',
    name: 'Technical Universities',
    campuses: [
      'ATU', 'KsTU', 'TTU', 'HTU', 'CCTU', 'TaTU', 'STU', 'BTU', 'KTU', 'DHLTU'
    ]
  },
  {
    id: 'colleges-of-education',
    name: 'Colleges of Education',
    campuses: [
      'ACE', 'AdaCE', 'AgogoPCE', 'AkroCE', 'BagabagaCE', 'BerekumCE', 
      'DambaiCE', 'E.P.CE', 'HolyChildCE', 'JasikanCE', 'KomendaCE', 
      'McCoyCE', 'MountMaryCE', 'PekiCE', 'SDA-CE', 'StFrancisCE', 
      'TumuCE', 'WesleyCE'
    ]
  },
  {
    id: 'nursing-midwifery-public',
    name: 'Nursing & Midwifery (Public)',
    campuses: [
      'KB-NMTC', 'K-NMTC', 'CC-NMTC', 'Ho-NMTC', 'Ta-NMTC', 'Pantang-NTC',
      'Ankaful-NTC', 'Bolga-NTC', 'Tamale-NTC', 'Agogo-NTC'
    ]
  },
  {
    id: 'nursing-midwifery-private',
    name: 'Nursing & Midwifery (Private)',
    campuses: [
      'NSON', 'SKSON', 'CHAG-NTCs', 'SDA-NMTCs', 'PB-NMTC', 'Narh-Bita'
    ]
  }
];

// Get all campuses as a flat array
export const getAllCampuses = (): string[] => {
  return CAMPUS_GROUPS.flatMap(group => group.campuses);
};

// Get group by campus name
export const getGroupByCampus = (campus: string): CampusGroup | undefined => {
  return CAMPUS_GROUPS.find(group => group.campuses.includes(campus));
};

// Get group by ID
export const getGroupById = (groupId: string): CampusGroup | undefined => {
  return CAMPUS_GROUPS.find(group => group.id === groupId);
};

// Get all group names
export const getGroupNames = (): string[] => {
  return CAMPUS_GROUPS.map(group => group.name);
};

// Check if a campus exists
export const isCampusValid = (campus: string): boolean => {
  return getAllCampuses().includes(campus);
};
