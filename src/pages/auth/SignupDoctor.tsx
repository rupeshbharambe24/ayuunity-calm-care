import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { DoctorDetailsStep } from '@/components/professional/steps/DoctorDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { DoctorSignupSchema } from '@/lib/validation';
import { apiRequest } from '@/lib/api';

const REQUIRED_DOCS = [
  { type: 'registration', label: 'Medical Registration Certificate' },
  { type: 'degree', label: 'Degree Certificate (MBBS/MD/MS)' },
  { type: 'govt_id', label: 'Government ID (Aadhaar/PAN/Passport)' },
  { type: 'photo', label: 'Recent Photograph' },
];

const steps = [
  {
    id: 'account',
    label: 'Account',
    component: (props: any) => <AccountStep {...props} isOrg={false} />,
  },
  {
    id: 'details',
    label: 'Professional Details',
    component: DoctorDetailsStep,
  },
  {
    id: 'documents',
    label: 'Documents',
    component: (props: any) => <DocumentsStep {...props} requiredDocs={REQUIRED_DOCS} />,
  },
  {
    id: 'declarations',
    label: 'Declarations',
    component: DeclarationsStep,
  },
];

export default function SignupDoctor() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/doctor', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="doctor"
      schema={DoctorSignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
