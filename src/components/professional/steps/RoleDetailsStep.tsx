import { useTranslation } from 'react-i18next';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { RoleConfig, FieldConfig } from '@/lib/roleConfig';

interface RoleDetailsStepProps {
  form: any;
  config: RoleConfig;
}

export const RoleDetailsStep = ({ form, config }: RoleDetailsStepProps) => {
  const { t } = useTranslation();

  const renderField = (field: FieldConfig) => {
    const name = `details.${field.key}`;

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {t(field.labelKey)}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholderKey ? t(field.placeholderKey) : ''}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'number':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {t(field.labelKey)}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={field.placeholderKey ? t(field.placeholderKey) : ''}
                    {...formField}
                    onChange={(e) => formField.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'textarea':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {t(field.labelKey)}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholderKey ? t(field.placeholderKey) : ''}
                    rows={3}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'checkbox':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t(field.labelKey)}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {t(field.labelKey)}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('auth.signup.select')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.optionsKey &&
                      t(field.optionsKey, { returnObjects: true }) instanceof Array &&
                      (t(field.optionsKey, { returnObjects: true }) as string[]).map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'multiselect':
        return (
          <FormField
            key={field.key}
            control={form.control}
            name={name}
            render={({ field: formField }) => {
              const values = formField.value || [];
              const options = field.optionsKey
                ? (t(field.optionsKey, { returnObjects: true }) as string[])
                : [];

              return (
                <FormItem>
                  <FormLabel>
                    {t(field.labelKey)}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!values.includes(value)) {
                        formField.onChange([...values, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('auth.signup.select')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {values.map((value: string) => (
                      <Badge key={value} variant="secondary" className="gap-1">
                        {value}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            formField.onChange(values.filter((v: string) => v !== value));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Identifiers Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('signup.identifiersTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.identifiers.map(renderField)}
        </div>
      </div>

      {/* Professional Details Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('signup.professionalDetailsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map(renderField)}
        </div>
      </div>
    </div>
  );
};
