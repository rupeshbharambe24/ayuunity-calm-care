import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { RoleDetailsStep } from '@/components/professional/steps/RoleDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { roleConfigs } from '@/lib/roleConfig';
import { apiRequest } from '@/lib/api';
import { NgoSignupSchema } from '@/lib/validation';

const config = roleConfigs.ngo;

const steps = [
  {
    id: 'account',
    label: 'Organization Details',
    component: (props: any) => <AccountStep {...props} isOrg={true} />,
  },
  {
    id: 'details',
    label: 'Program Details',
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

export default function SignupNgo() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/ngo', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="ngo"
      schema={NgoSignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
