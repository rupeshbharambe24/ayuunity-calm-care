import { z } from 'zod';

export const ICEContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relation: z.string().min(2, 'Relation must be at least 2 characters'),
  phone: z.string().min(7, 'Phone must be at least 7 characters').max(20, 'Phone must be at most 20 characters'),
});

export const MedicationSchema = z.object({
  name: z.string().min(2, 'Medication name required'),
  dose: z.string().min(1, 'Dose required'),
  frequency: z.string().min(1, 'Frequency required'),
  notes: z.string().max(300, 'Notes must be less than 300 characters').optional(),
});

export const SurgerySchema = z.object({
  title: z.string().min(2, 'Surgery title required'),
  date: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Date must be YYYY-MM-DD format'),
  notes: z.string().max(300, 'Notes must be less than 300 characters').optional(),
});

export const PatientMedicalProfileSchema = z.object({
  blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  allergies: z.array(z.string().min(2)).max(20).default([]),
  chronic_conditions: z.array(z.string().min(2)).max(20).default([]),
  medications: z.array(MedicationSchema).max(50).default([]),
  surgeries: z.array(SurgerySchema).max(50).default([]),
  lifestyle: z.object({
    smoking: z.enum(['never', 'former', 'current']).optional(),
    alcohol: z.enum(['never', 'occasional', 'regular']).optional(),
    activity: z.enum(['low', 'medium', 'high']).optional(),
  }).optional(),
  ice_contacts: z.array(ICEContactSchema).min(1, 'At least one emergency contact required').max(2),
});

export const PatientAccountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Date must be YYYY-MM-DD format'),
  sex_at_birth: z.enum(['male', 'female', 'intersex', 'prefer_not_to_say']),
  gender: z.enum(['male', 'female', 'nonbinary', 'other']).optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().min(7).max(20).optional(),
  address: z.object({
    line1: z.string().min(3, 'Address line 1 required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City required'),
    state: z.string().min(2, 'State required'),
    postal_code: z.string().min(3, 'Postal code required'),
    country: z.string().min(2, 'Country required'),
  }),
});

export const OTPRequestSchema = z.object({
  channel: z.enum(['phone', 'email']),
  value: z.string().min(7, 'Phone or email required'),
  captcha_token: z.string().optional(),
});

export const OTPVerifySchema = z.object({
  request_id: z.string(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// Professional base schemas
const AddressSchema = z.object({
  line1: z.string().min(3, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postal_code: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

const BaseAccountSchema = z.object({
  contact_name: z.string().min(2, "Contact name is required"),
  official_email: z.string().email("Valid official email required"),
  official_phone: z.string().min(7).max(20, "Valid phone required"),
  address: AddressSchema,
});

const BaseOrgAccountSchema = BaseAccountSchema.extend({
  org_name: z.string().min(2, "Organization name is required"),
});

// Doctor
export const DoctorDetailsSchema = z.object({
  registration_board: z.string().min(2, "Registration board required"),
  registration_number: z.string().min(3, "Registration number required"),
  registration_year: z.string().regex(/^\d{4}$/, "Valid year required"),
  degrees: z.array(z.string()).min(1, "At least one degree required"),
  specialties: z.array(z.string()).min(1, "At least one specialty required"),
  experience_years: z.number().min(0).max(70),
  languages: z.array(z.string()).min(1, "At least one language required"),
  consultation_modes: z.array(z.enum(['clinic','teleconsult','home_visit'])).min(1),
  fee_range_min: z.number().min(0).optional(),
  fee_range_max: z.number().min(0).optional(),
});

export const DoctorSignupSchema = z.object({
  account: BaseAccountSchema,
  details: DoctorDetailsSchema,
  documents: z.array(z.object({
    file_id: z.string(),
    type: z.enum(['registration','degree','govt_id','photo','other']),
  })).min(3, "Minimum 3 documents required"),
  declarations: z.object({
    truth: z.literal(true, { errorMap: () => ({ message: "You must certify the information is true" }) }),
    verify_consent: z.literal(true),
  }),
});

// AYUSH
export const AyushSignupSchema = z.object({
  account: BaseAccountSchema,
  identifiers: z.object({
    council: z.string().min(2),
    reg_id: z.string().min(2),
    system: z.string().min(2),
    year: z.number().int().gte(1950),
  }),
  details: z.object({
    degrees: z.array(z.string()).min(1),
    institute: z.string().min(2),
    specialties: z.array(z.string()).min(1),
    experience_years: z.number().min(0),
    languages: z.array(z.string()).min(1),
    consultation_modes: z.array(z.string()).min(1),
    clinic_locations: z.string().optional(),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Hospital
export const HospitalSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    license_no: z.string().min(2),
    gstin: z.string().min(2),
    cin: z.string().optional(),
  }),
  details: z.object({
    facility_type: z.string().min(2),
    beds_total: z.number().int().min(0),
    beds_icu: z.number().int().min(0),
    opd_hours: z.string().min(2),
    primary_officer: z.string().min(2),
    staff_email_domain: z.string().optional(),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Pharmacy
export const PharmacySignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    drug_license: z.string().min(2),
    gstin: z.string().min(2),
  }),
  details: z.object({
    pharmacist_name: z.string().min(2),
    pharmacist_reg: z.string().min(2),
    store_address: z.string().min(3),
    service_radius: z.number().optional(),
    delivery: z.boolean().optional(),
    pickup: z.boolean().optional(),
    hours: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Lab
export const LabSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    lab_license: z.string().min(2),
    nabl_id: z.string().optional(),
    gstin: z.string().min(2),
  }),
  details: z.object({
    categories: z.array(z.string()).min(1),
    home_collection: z.boolean().optional(),
    tat_promises: z.string().optional(),
    quality_manager: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// NGO
export const NgoSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    reg_no: z.string().min(2),
    twelve_a: z.string().optional(),
    fcra: z.string().optional(),
  }),
  details: z.object({
    regions: z.array(z.string()).min(1),
    program_types: z.array(z.string()).min(1),
    poc: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Government
export const GovernmentSignupSchema = z.object({
  account: BaseAccountSchema,
  identifiers: z.object({
    department: z.string().min(2),
    designation: z.string().min(2),
    official_email: z.string().email(),
  }),
  details: z.object({
    office_address: z.string().min(3),
    jurisdiction: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Insurer
export const InsurerSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    irdai_or_tpa: z.string().min(2),
    gstin: z.string().min(2),
  }),
  details: z.object({
    products: z.array(z.string()).min(1),
    regions: z.array(z.string()).min(1),
    claims_contact: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Corporate
export const CorporateSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    cin: z.string().min(2),
    gstin: z.string().min(2),
    domain_email: z.string().email(),
  }),
  details: z.object({
    company_size: z.string().min(1),
    hr_contact: z.string().min(2),
    program_scope: z.array(z.string()).min(1),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Researcher
export const ResearcherSignupSchema = z.object({
  account: BaseAccountSchema,
  identifiers: z.object({
    institution: z.string().min(2),
    academic_email: z.string().email(),
    irb_ref: z.string().min(2),
  }),
  details: z.object({
    study_title: z.string().min(2),
    purpose: z.string().min(10),
    data_fields: z.array(z.string()).min(1),
    duration: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Ambulance
export const AmbulanceSignupSchema = z.object({
  account: BaseOrgAccountSchema,
  identifiers: z.object({
    permit_no: z.string().min(2),
    helpline: z.string().min(7),
  }),
  details: z.object({
    fleet_size: z.number().int().min(1),
    vehicle_types: z.array(z.string()).min(1),
    twenty_four_seven: z.boolean().optional(),
    gps_provider: z.string().optional(),
    coverage_area: z.string().min(2),
    ops_contact: z.string().min(2),
  }),
  documents: z.array(z.object({ file_id: z.string(), type: z.string() })).min(1),
  declarations: z.object({ truth: z.literal(true), verify_consent: z.literal(true) }),
});

// Export types
export type ICEContact = z.infer<typeof ICEContactSchema>;
export type Medication = z.infer<typeof MedicationSchema>;
export type Surgery = z.infer<typeof SurgerySchema>;
export type PatientMedicalProfile = z.infer<typeof PatientMedicalProfileSchema>;
export type PatientAccount = z.infer<typeof PatientAccountSchema>;
