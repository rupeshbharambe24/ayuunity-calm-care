import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { RoleDetailsStep } from '@/components/professional/steps/RoleDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { roleConfigs } from '@/lib/roleConfig';
import { apiRequest } from '@/lib/api';
import { GovernmentSignupSchema } from '@/lib/validation';

const config = roleConfigs.government;

const steps = [
  {
    id: 'account',
    label: 'Contact Details',
    component: (props: any) => <AccountStep {...props} isOrg={false} />,
  },
  {
    id: 'details',
    label: 'Office Details',
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

export default function SignupGovernment() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/government', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="government"
      schema={GovernmentSignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
