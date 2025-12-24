-- Drop the existing campus check constraint if it exists
ALTER TABLE public.stores DROP CONSTRAINT IF EXISTS stores_campus_check;

-- Add a new constraint with all 72 campuses
ALTER TABLE public.stores ADD CONSTRAINT stores_campus_check CHECK (
  campus IS NULL OR campus IN (
    -- Public Universities (15)
    'UG', 'KNUST', 'UCC', 'UEW', 'UDS', 'UPSA', 'UMaT', 'UHAS', 'UENR', 
    'UESD', 'GCTU', 'AAMUSTED', 'CK-TU', 'SDD-UBIDS', 'UniMAC',
    -- Private Universities (13)
    'ASHESI', 'CU', 'VVU', 'WIUC', 'REGENT', 'KUC', 'PUC', 'CSUC', 
    'GCUC', 'LUC', 'OIC', 'WUG', 'UCG',
    -- Technical Universities (10)
    'ATU', 'KsTU', 'TTU', 'HTU', 'CCTU', 'TaTU', 'STU', 'BTU', 'KTU', 'DHLTU',
    -- Colleges of Education (18)
    'ACE', 'AdaCE', 'AgogoPCE', 'AkroCE', 'BagabagaCE', 'BerekumCE', 
    'DambaiCE', 'E.P.CE', 'HolyChildCE', 'JasikanCE', 'KomendaCE', 
    'McCoyCE', 'MountMaryCE', 'PekiCE', 'SDA-CE', 'StFrancisCE', 
    'TumuCE', 'WesleyCE',
    -- Nursing & Midwifery Public (10)
    'KB-NMTC', 'K-NMTC', 'CC-NMTC', 'Ho-NMTC', 'Ta-NMTC', 'Pantang-NTC',
    'Ankaful-NTC', 'Bolga-NTC', 'Tamale-NTC', 'Agogo-NTC',
    -- Nursing & Midwifery Private (6)
    'NSON', 'SKSON', 'CHAG-NTCs', 'SDA-NMTCs', 'PB-NMTC', 'Narh-Bita'
  )
);