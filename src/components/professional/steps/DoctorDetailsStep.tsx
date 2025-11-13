import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DoctorDetailsStepProps {
  form: any;
}

export const DoctorDetailsStep = ({ form }: DoctorDetailsStepProps) => {
  const { t } = useTranslation();
  const [degreeInput, setDegreeInput] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const addItem = (field: string, value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    const current = form.getValues(field) || [];
    if (!current.includes(value)) {
      form.setValue(field, [...current, value]);
    }
    setter('');
  };

  const removeItem = (field: string, value: string) => {
    const current = form.getValues(field) || [];
    form.setValue(field, current.filter((v: string) => v !== value));
  };

  const degrees = form.watch('details.degrees') || [];
  const specialties = form.watch('details.specialties') || [];
  const languages = form.watch('details.languages') || [];
  const modes = form.watch('details.consultation_modes') || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {t('auth.professionalDetails', 'Professional Details')}
        </h2>
        <p className="text-muted-foreground">
          {t('auth.professionalDetailsSubtitle', 'Provide your medical credentials and practice information')}
        </p>
      </div>

      <div className="space-y-4">
        {/* Registration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="details.registration_board"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.registrationBoard')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="NMC / State Medical Council" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.registration_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.registrationNumber')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Registration #" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.registration_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.registrationYear')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="YYYY" min="1950" max={new Date().getFullYear()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Degrees */}
        <FormField
          control={form.control}
          name="details.degrees"
          render={() => (
            <FormItem>
              <FormLabel>{t('auth.degrees', 'Degrees')}</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={degreeInput}
                    onChange={(e) => setDegreeInput(e.target.value)}
                    placeholder="e.g., MBBS, MD"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('details.degrees', degreeInput, setDegreeInput);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem('details.degrees', degreeInput, setDegreeInput)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {degrees.map((degree: string) => (
                    <Badge key={degree} variant="secondary">
                      {degree}
                      <button
                        type="button"
                        onClick={() => removeItem('details.degrees', degree)}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Specialties */}
        <FormField
          control={form.control}
          name="details.specialties"
          render={() => (
            <FormItem>
              <FormLabel>{t('auth.specialties', 'Specialties')}</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    placeholder="e.g., Cardiology, General Medicine"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('details.specialties', specialtyInput, setSpecialtyInput);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem('details.specialties', specialtyInput, setSpecialtyInput)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                      <button
                        type="button"
                        onClick={() => removeItem('details.specialties', specialty)}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="details.experience_years"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.experienceYears', 'Years of Experience')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" max="70" onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Languages */}
        <FormField
          control={form.control}
          name="details.languages"
          render={() => (
            <FormItem>
              <FormLabel>{t('auth.languages', 'Languages Spoken')}</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    placeholder="e.g., English, Hindi"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('details.languages', languageInput, setLanguageInput);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem('details.languages', languageInput, setLanguageInput)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang: string) => (
                    <Badge key={lang} variant="secondary">
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeItem('details.languages', lang)}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Consultation Modes */}
        <FormField
          control={form.control}
          name="details.consultation_modes"
          render={() => (
            <FormItem>
              <FormLabel>{t('auth.consultationModes', 'Consultation Modes')}</FormLabel>
              <div className="flex flex-wrap gap-2">
                {['clinic', 'teleconsult', 'home_visit'].map((mode) => {
                  const isSelected = modes.includes(mode);
                  return (
                    <Badge
                      key={mode}
                      variant={isSelected ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        if (isSelected) {
                          form.setValue('details.consultation_modes', modes.filter((m: string) => m !== mode));
                        } else {
                          form.setValue('details.consultation_modes', [...modes, mode]);
                        }
                      }}
                    >
                      {mode === 'clinic' && 'In-Clinic'}
                      {mode === 'teleconsult' && 'Teleconsult'}
                      {mode === 'home_visit' && 'Home Visit'}
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fee Range */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="details.fee_range_min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.feeMin', 'Min Fee (₹)')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.fee_range_max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.feeMax', 'Max Fee (₹)')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
