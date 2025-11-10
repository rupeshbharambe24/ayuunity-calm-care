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

export type ICEContact = z.infer<typeof ICEContactSchema>;
export type Medication = z.infer<typeof MedicationSchema>;
export type Surgery = z.infer<typeof SurgerySchema>;
export type PatientMedicalProfile = z.infer<typeof PatientMedicalProfileSchema>;
export type PatientAccount = z.infer<typeof PatientAccountSchema>;
