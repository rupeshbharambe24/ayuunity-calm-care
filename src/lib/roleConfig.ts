export type RoleKey = 'doctor' | 'ayush' | 'hospital' | 'pharmacy' | 'lab' | 'ngo' | 'government' | 'insurer' | 'corporate' | 'researcher' | 'ambulance';

export interface FieldConfig {
  key: string;
  labelKey: string;
  placeholderKey?: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'checkbox' | 'email';
  optionsKey?: string;
  required?: boolean;
}

export interface DocumentConfig {
  type: string;
  labelKey: string;
  required: boolean;
}

export interface RoleConfig {
  titleKey: string;
  subtitleKey: string;
  identifiers: FieldConfig[];
  fields: FieldConfig[];
  documents: DocumentConfig[];
  apiRole: string;
}

export const roleConfigs: Record<RoleKey, RoleConfig> = {
  doctor: {
    titleKey: 'auth.roles.doctor',
    subtitleKey: 'signup.doctor.subtitle',
    identifiers: [
      { key: 'board', labelKey: 'signup.identifiers.board', type: 'select', optionsKey: 'signup.options.medicalBoards', required: true },
      { key: 'reg_no', labelKey: 'signup.identifiers.regNo', placeholderKey: 'signup.identifiers.regNoPlaceholder', type: 'text', required: true },
      { key: 'reg_year', labelKey: 'signup.identifiers.regYear', type: 'number', required: true },
    ],
    fields: [
      { key: 'degrees', labelKey: 'signup.fields.degrees', type: 'multiselect', optionsKey: 'signup.options.medicalDegrees', required: true },
      { key: 'specialties', labelKey: 'signup.fields.specialties', type: 'multiselect', optionsKey: 'signup.options.specialties', required: true },
      { key: 'experience_years', labelKey: 'signup.fields.experienceYears', type: 'number', required: true },
      { key: 'languages', labelKey: 'signup.fields.languages', type: 'multiselect', optionsKey: 'signup.options.languages', required: true },
      { key: 'consultation_modes', labelKey: 'signup.fields.consultationModes', type: 'multiselect', optionsKey: 'signup.options.consultationModes', required: true },
      { key: 'fee_range', labelKey: 'signup.fields.feeRange', placeholderKey: 'signup.fields.feeRangePlaceholder', type: 'text', required: false },
      { key: 'clinic_locations', labelKey: 'signup.fields.clinicLocations', placeholderKey: 'signup.fields.clinicLocationsPlaceholder', type: 'textarea', required: false },
    ],
    documents: [
      { type: 'registration', labelKey: 'signup.documents.registration', required: true },
      { type: 'degree', labelKey: 'signup.documents.degree', required: true },
      { type: 'govt_id', labelKey: 'signup.documents.govtId', required: true },
      { type: 'photo', labelKey: 'signup.documents.photo', required: true },
      { type: 'letterhead', labelKey: 'signup.documents.letterhead', required: false },
    ],
    apiRole: 'doctor',
  },
  ayush: {
    titleKey: 'auth.roles.ayush',
    subtitleKey: 'signup.ayush.subtitle',
    identifiers: [
      { key: 'council', labelKey: 'signup.identifiers.council', type: 'select', optionsKey: 'signup.options.ayushCouncils', required: true },
      { key: 'reg_id', labelKey: 'signup.identifiers.regId', type: 'text', required: true },
      { key: 'system', labelKey: 'signup.identifiers.system', type: 'select', optionsKey: 'signup.options.ayushSystems', required: true },
      { key: 'year', labelKey: 'signup.identifiers.regYear', type: 'number', required: true },
    ],
    fields: [
      { key: 'degrees', labelKey: 'signup.fields.degrees', type: 'multiselect', optionsKey: 'signup.options.ayushDegrees', required: true },
      { key: 'institute', labelKey: 'signup.fields.institute', type: 'text', required: true },
      { key: 'specialties', labelKey: 'signup.fields.specialties', type: 'multiselect', optionsKey: 'signup.options.ayushSpecialties', required: true },
      { key: 'experience_years', labelKey: 'signup.fields.experienceYears', type: 'number', required: true },
      { key: 'languages', labelKey: 'signup.fields.languages', type: 'multiselect', optionsKey: 'signup.options.languages', required: true },
      { key: 'consultation_modes', labelKey: 'signup.fields.consultationModes', type: 'multiselect', optionsKey: 'signup.options.consultationModes', required: true },
      { key: 'clinic_locations', labelKey: 'signup.fields.clinicLocations', type: 'textarea', required: false },
    ],
    documents: [
      { type: 'council_registration', labelKey: 'signup.documents.councilRegistration', required: true },
      { type: 'degree', labelKey: 'signup.documents.degree', required: true },
      { type: 'govt_id', labelKey: 'signup.documents.govtId', required: true },
      { type: 'clinic_proof', labelKey: 'signup.documents.clinicProof', required: false },
    ],
    apiRole: 'ayush',
  },
  hospital: {
    titleKey: 'auth.roles.hospital',
    subtitleKey: 'signup.hospital.subtitle',
    identifiers: [
      { key: 'license_no', labelKey: 'signup.identifiers.facilityLicense', type: 'text', required: true },
      { key: 'gstin', labelKey: 'signup.identifiers.gstin', type: 'text', required: true },
      { key: 'cin', labelKey: 'signup.identifiers.cin', type: 'text', required: false },
    ],
    fields: [
      { key: 'facility_type', labelKey: 'signup.fields.facilityType', type: 'select', optionsKey: 'signup.options.facilityTypes', required: true },
      { key: 'beds_total', labelKey: 'signup.fields.bedsTotal', type: 'number', required: true },
      { key: 'beds_icu', labelKey: 'signup.fields.bedsIcu', type: 'number', required: true },
      { key: 'opd_hours', labelKey: 'signup.fields.opdHours', type: 'text', required: true },
      { key: 'primary_officer', labelKey: 'signup.fields.primaryOfficer', type: 'text', required: true },
      { key: 'staff_email_domain', labelKey: 'signup.fields.staffEmailDomain', placeholderKey: 'signup.fields.staffEmailDomainPlaceholder', type: 'text', required: false },
    ],
    documents: [
      { type: 'license', labelKey: 'signup.documents.license', required: true },
      { type: 'nabh_nabl', labelKey: 'signup.documents.nabhNabl', required: false },
      { type: 'pan', labelKey: 'signup.documents.pan', required: true },
      { type: 'gst', labelKey: 'signup.documents.gst', required: true },
      { type: 'admin_id', labelKey: 'signup.documents.adminId', required: true },
      { type: 'authorization', labelKey: 'signup.documents.authorization', required: true },
    ],
    apiRole: 'hospital',
  },
  pharmacy: {
    titleKey: 'auth.roles.pharmacy',
    subtitleKey: 'signup.pharmacy.subtitle',
    identifiers: [
      { key: 'drug_license', labelKey: 'signup.identifiers.drugLicense', type: 'text', required: true },
      { key: 'gstin', labelKey: 'signup.identifiers.gstin', type: 'text', required: true },
    ],
    fields: [
      { key: 'pharmacist_name', labelKey: 'signup.fields.pharmacistName', type: 'text', required: true },
      { key: 'pharmacist_reg', labelKey: 'signup.fields.pharmacistReg', type: 'text', required: true },
      { key: 'store_address', labelKey: 'signup.fields.storeAddress', type: 'textarea', required: true },
      { key: 'service_radius', labelKey: 'signup.fields.serviceRadius', type: 'number', required: false },
      { key: 'delivery', labelKey: 'signup.fields.delivery', type: 'checkbox', required: false },
      { key: 'pickup', labelKey: 'signup.fields.pickup', type: 'checkbox', required: false },
      { key: 'hours', labelKey: 'signup.fields.hours', type: 'text', required: true },
    ],
    documents: [
      { type: 'drug_license', labelKey: 'signup.documents.drugLicense', required: true },
      { type: 'pharmacist_card', labelKey: 'signup.documents.pharmacistCard', required: true },
      { type: 'owner_id', labelKey: 'signup.documents.ownerId', required: true },
      { type: 'storefront_photo', labelKey: 'signup.documents.storefrontPhoto', required: true },
    ],
    apiRole: 'pharmacy',
  },
  lab: {
    titleKey: 'auth.roles.lab',
    subtitleKey: 'signup.lab.subtitle',
    identifiers: [
      { key: 'lab_license', labelKey: 'signup.identifiers.labLicense', type: 'text', required: true },
      { key: 'nabl_id', labelKey: 'signup.identifiers.nablId', type: 'text', required: false },
      { key: 'gstin', labelKey: 'signup.identifiers.gstin', type: 'text', required: true },
    ],
    fields: [
      { key: 'categories', labelKey: 'signup.fields.labCategories', type: 'multiselect', optionsKey: 'signup.options.labCategories', required: true },
      { key: 'home_collection', labelKey: 'signup.fields.homeCollection', type: 'checkbox', required: false },
      { key: 'tat_promises', labelKey: 'signup.fields.tatPromises', type: 'text', required: false },
      { key: 'quality_manager', labelKey: 'signup.fields.qualityManager', type: 'text', required: true },
    ],
    documents: [
      { type: 'license', labelKey: 'signup.documents.license', required: true },
      { type: 'nabl_cert', labelKey: 'signup.documents.nablCert', required: false },
      { type: 'pathologist_reg', labelKey: 'signup.documents.pathologistReg', required: true },
      { type: 'manager_id', labelKey: 'signup.documents.managerId', required: true },
    ],
    apiRole: 'lab',
  },
  ngo: {
    titleKey: 'auth.roles.ngo',
    subtitleKey: 'signup.ngo.subtitle',
    identifiers: [
      { key: 'reg_no', labelKey: 'signup.identifiers.ngoRegNo', type: 'text', required: true },
      { key: 'twelve_a', labelKey: 'signup.identifiers.twelveA', type: 'text', required: false },
      { key: 'fcra', labelKey: 'signup.identifiers.fcra', type: 'text', required: false },
    ],
    fields: [
      { key: 'regions', labelKey: 'signup.fields.regions', type: 'multiselect', optionsKey: 'signup.options.indianStates', required: true },
      { key: 'program_types', labelKey: 'signup.fields.programTypes', type: 'multiselect', optionsKey: 'signup.options.ngoPrograms', required: true },
      { key: 'poc', labelKey: 'signup.fields.poc', type: 'text', required: true },
    ],
    documents: [
      { type: 'registration', labelKey: 'signup.documents.registration', required: true },
      { type: 'authorization', labelKey: 'signup.documents.authorization', required: true },
      { type: 'poc_id', labelKey: 'signup.documents.pocId', required: true },
    ],
    apiRole: 'ngo',
  },
  government: {
    titleKey: 'auth.roles.government',
    subtitleKey: 'signup.government.subtitle',
    identifiers: [
      { key: 'department', labelKey: 'signup.identifiers.department', type: 'text', required: true },
      { key: 'designation', labelKey: 'signup.identifiers.designation', type: 'text', required: true },
      { key: 'official_email', labelKey: 'signup.identifiers.officialEmail', type: 'email', required: true },
    ],
    fields: [
      { key: 'office_address', labelKey: 'signup.fields.officeAddress', type: 'textarea', required: true },
      { key: 'jurisdiction', labelKey: 'signup.fields.jurisdiction', type: 'text', required: true },
    ],
    documents: [
      { type: 'govt_id', labelKey: 'signup.documents.govtId', required: true },
      { type: 'authorization', labelKey: 'signup.documents.authorization', required: true },
    ],
    apiRole: 'government',
  },
  insurer: {
    titleKey: 'auth.roles.insurance',
    subtitleKey: 'signup.insurer.subtitle',
    identifiers: [
      { key: 'irdai_or_tpa', labelKey: 'signup.identifiers.irdaiTpa', type: 'text', required: true },
      { key: 'gstin', labelKey: 'signup.identifiers.gstin', type: 'text', required: true },
    ],
    fields: [
      { key: 'products', labelKey: 'signup.fields.products', type: 'multiselect', optionsKey: 'signup.options.insuranceProducts', required: true },
      { key: 'regions', labelKey: 'signup.fields.regions', type: 'multiselect', optionsKey: 'signup.options.indianStates', required: true },
      { key: 'claims_contact', labelKey: 'signup.fields.claimsContact', type: 'text', required: true },
    ],
    documents: [
      { type: 'irdai_cert', labelKey: 'signup.documents.irdaiCert', required: true },
      { type: 'signatory_id', labelKey: 'signup.documents.signatoryId', required: true },
      { type: 'gst', labelKey: 'signup.documents.gst', required: true },
    ],
    apiRole: 'insurer',
  },
  corporate: {
    titleKey: 'auth.roles.corporate',
    subtitleKey: 'signup.corporate.subtitle',
    identifiers: [
      { key: 'cin', labelKey: 'signup.identifiers.cin', type: 'text', required: true },
      { key: 'gstin', labelKey: 'signup.identifiers.gstin', type: 'text', required: true },
      { key: 'domain_email', labelKey: 'signup.identifiers.domainEmail', type: 'email', required: true },
    ],
    fields: [
      { key: 'company_size', labelKey: 'signup.fields.companySize', type: 'select', optionsKey: 'signup.options.companySizes', required: true },
      { key: 'hr_contact', labelKey: 'signup.fields.hrContact', type: 'text', required: true },
      { key: 'program_scope', labelKey: 'signup.fields.programScope', type: 'multiselect', optionsKey: 'signup.options.wellnessPrograms', required: true },
    ],
    documents: [
      { type: 'authorization', labelKey: 'signup.documents.authorization', required: true },
      { type: 'signatory_id', labelKey: 'signup.documents.signatoryId', required: true },
      { type: 'company_proof', labelKey: 'signup.documents.companyProof', required: true },
    ],
    apiRole: 'corporate',
  },
  researcher: {
    titleKey: 'auth.roles.researcher',
    subtitleKey: 'signup.researcher.subtitle',
    identifiers: [
      { key: 'institution', labelKey: 'signup.identifiers.institution', type: 'text', required: true },
      { key: 'academic_email', labelKey: 'signup.identifiers.academicEmail', type: 'email', required: true },
      { key: 'irb_ref', labelKey: 'signup.identifiers.irbRef', type: 'text', required: true },
    ],
    fields: [
      { key: 'study_title', labelKey: 'signup.fields.studyTitle', type: 'text', required: true },
      { key: 'purpose', labelKey: 'signup.fields.purpose', type: 'textarea', required: true },
      { key: 'data_fields', labelKey: 'signup.fields.dataFields', type: 'multiselect', optionsKey: 'signup.options.dataFields', required: true },
      { key: 'duration', labelKey: 'signup.fields.duration', type: 'text', required: true },
    ],
    documents: [
      { type: 'id_card', labelKey: 'signup.documents.idCard', required: true },
      { type: 'irb_approval', labelKey: 'signup.documents.irbApproval', required: true },
    ],
    apiRole: 'researcher',
  },
  ambulance: {
    titleKey: 'auth.roles.ambulance',
    subtitleKey: 'signup.ambulance.subtitle',
    identifiers: [
      { key: 'permit_no', labelKey: 'signup.identifiers.permitNo', type: 'text', required: true },
      { key: 'helpline', labelKey: 'signup.identifiers.helpline', type: 'text', required: true },
    ],
    fields: [
      { key: 'fleet_size', labelKey: 'signup.fields.fleetSize', type: 'number', required: true },
      { key: 'vehicle_types', labelKey: 'signup.fields.vehicleTypes', type: 'multiselect', optionsKey: 'signup.options.ambulanceTypes', required: true },
      { key: 'twenty_four_seven', labelKey: 'signup.fields.twentyFourSeven', type: 'checkbox', required: false },
      { key: 'gps_provider', labelKey: 'signup.fields.gpsProvider', type: 'text', required: false },
      { key: 'coverage_area', labelKey: 'signup.fields.coverageArea', type: 'text', required: true },
      { key: 'ops_contact', labelKey: 'signup.fields.opsContact', type: 'text', required: true },
    ],
    documents: [
      { type: 'vehicle_permits', labelKey: 'signup.documents.vehiclePermits', required: true },
      { type: 'operator_id', labelKey: 'signup.documents.operatorId', required: true },
      { type: 'equipment_checklist', labelKey: 'signup.documents.equipmentChecklist', required: true },
    ],
    apiRole: 'ambulance',
  },
};
