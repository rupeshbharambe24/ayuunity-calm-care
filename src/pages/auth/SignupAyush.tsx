import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { RoleDetailsStep } from '@/components/professional/steps/RoleDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { roleConfigs } from '@/lib/roleConfig';
import { apiRequest } from '@/lib/api';
import { AyushSignupSchema } from '@/lib/validation';

const config = roleConfigs.ayush;

const steps = [
  {
    id: 'account',
    label: 'Account',
    component: (props: any) => <AccountStep {...props} isOrg={false} />,
  },
  {
    id: 'details',
    label: 'Professional Details',
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

export default function SignupAyush() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/ayush', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="ayush"
      schema={AyushSignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
