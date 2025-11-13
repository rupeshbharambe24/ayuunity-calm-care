import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface AccountStepProps {
  form: any;
  role: string;
  isOrg?: boolean;
}

export const AccountStep = ({ form, role, isOrg = false }: AccountStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t('auth.stepAccount')}</h2>
        <p className="text-muted-foreground">
          {t('auth.accountInfoSubtitle', 'Provide your contact information')}
        </p>
      </div>

      <div className="space-y-4">
        {isOrg && (
          <FormField
            control={form.control}
            name="account.org_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.orgName', 'Organization Name')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('auth.orgNamePlaceholder', 'Enter organization name')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="account.contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.contactName', isOrg ? 'Contact Person Name' : 'Full Name')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('auth.namePlaceholder', 'Enter full name')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="account.official_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.officialEmail')}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="name@organization.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account.official_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.officialPhone')}</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="+91" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('auth.address')}</Label>
          
          <FormField
            control={form.control}
            name="account.address.line1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t('auth.signup.line1')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account.address.line2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t('auth.signup.line2')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="account.address.city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={t('auth.signup.city')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account.address.state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={t('auth.signup.state')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="account.address.postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={t('auth.signup.postalCode')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account.address.country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={t('auth.signup.country')} defaultValue="IN" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
