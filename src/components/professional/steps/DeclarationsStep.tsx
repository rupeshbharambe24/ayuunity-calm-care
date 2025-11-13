import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface DeclarationsStepProps {
  form: any;
}

export const DeclarationsStep = ({ form }: DeclarationsStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {t('auth.declarations', 'Declarations & Consent')}
        </h2>
        <p className="text-muted-foreground">
          {t('auth.declarationsSubtitle', 'Review and accept the following declarations')}
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          {t(
            'auth.verificationNotice',
            'Your application will be reviewed by our verification team. This process typically takes 24-48 hours.'
          )}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="declarations.truth"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-medium">
                  {t('auth.certifyTruth', 'I certify that all information provided is true and accurate')} *
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'auth.certifyTruthDesc',
                    'Providing false information may result in permanent ban from the platform'
                  )}
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="declarations.verify_consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-medium">
                  {t('auth.verifyConsent', 'I consent to verification of my credentials')} *
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'auth.verifyConsentDesc',
                    'We may contact relevant authorities to verify your professional credentials'
                  )}
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="rounded-md border p-4 space-y-2">
          <div className="font-medium">
            {t('auth.dataProcessing', 'Data Processing')}
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              'auth.dataProcessingDesc',
              'By submitting this application, you agree to our Terms of Service and Privacy Policy. Your data will be encrypted and stored securely.'
            )}
          </p>
          <div className="flex gap-2 text-sm">
            <a href="/terms" className="text-primary hover:underline" target="_blank">
              {t('auth.terms')}
            </a>
            <span>•</span>
            <a href="/privacy" className="text-primary hover:underline" target="_blank">
              {t('auth.privacy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
