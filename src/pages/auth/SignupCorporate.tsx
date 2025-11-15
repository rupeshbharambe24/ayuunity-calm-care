import { SignupWizard } from '@/components/professional/SignupWizard';
import { AccountStep } from '@/components/professional/steps/AccountStep';
import { RoleDetailsStep } from '@/components/professional/steps/RoleDetailsStep';
import { DocumentsStep } from '@/components/professional/steps/DocumentsStep';
import { DeclarationsStep } from '@/components/professional/steps/DeclarationsStep';
import { roleConfigs } from '@/lib/roleConfig';
import { apiRequest } from '@/lib/api';
import { CorporateSignupSchema } from '@/lib/validation';

const config = roleConfigs.corporate;

const steps = [
  {
    id: 'account',
    label: 'Company Details',
    component: (props: any) => <AccountStep {...props} isOrg={true} />,
  },
  {
    id: 'details',
    label: 'Wellness Program',
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

export default function SignupCorporate() {
  const handleSubmit = async (data: any) => {
    return apiRequest('/auth/signup/corporate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <SignupWizard
      role="corporate"
      schema={CorporateSignupSchema}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
}
