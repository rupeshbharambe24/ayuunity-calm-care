import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { RoleDetailsStep } from '@/components/professional/steps/RoleDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { roleConfigs } from '@/lib/roleConfig';
import { apiRequest } from '@/lib/api';
import { PharmacySignupSchema } from '@/lib/validation';

const config = roleConfigs.pharmacy;

const steps = [
  {
    id: 'account',
    label: 'Account & Contact',
    component: (props: any) => <AccountStep {...props} isOrg={true} />,
  },
  {
    id: 'details',
    label: 'Store Details',
    component: (props: any) => <RoleDetailsStep {...props} config={config} />,
  },
  {
    id: 'documents',
    label: 'Documents',
    component: (props: any) => <DocumentsStep {...props} requiredDocs={config.documents} />,
  },
  {
    id: 'declarations',
    label: 'Declarations',
    component: DeclarationsStep,
  },
];

export default function SignupPharmacy() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/pharmacy', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="pharmacy"
      schema={PharmacySignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
