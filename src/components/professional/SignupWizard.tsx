import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check, Upload } from 'lucide-react';
import type { z } from 'zod';

interface WizardStep {
  id: string;
  label: string;
  component: React.ComponentType<any>;
}

interface SignupWizardProps {
  role: string;
  schema: z.ZodSchema;
  steps: WizardStep[];
  onSubmit: (data: any) => Promise<void>;
}

export const SignupWizard = ({ role, schema, steps, onSubmit }: SignupWizardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = async () => {
    // Validate current step fields if needed
    const isValid = await form.trigger();
    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success(t('auth.signupSuccess'));
      navigate('/auth/pending');
    } catch (error: any) {
      toast.error(error.message || t('auth.signupError'));
    } finally {
      setIsSubmitting(false);
    }
  });

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t(`auth.roles.${role}`)} {t('auth.signupTitle')}
          </h1>
          <p className="text-muted-foreground">
            {t('auth.proSignupSubtitle', 'Complete your professional profile')}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < totalSteps - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    index < currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : index === currentStep
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < totalSteps - 1 && (
                  <div className="flex-1 h-0.5 bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={index === currentStep ? 'font-medium text-foreground' : ''}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentStepComponent form={form} role={role} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('auth.back')}
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button onClick={handleNext}>
              {t('auth.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? t('auth.submitting') : t('auth.signup.submit')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
