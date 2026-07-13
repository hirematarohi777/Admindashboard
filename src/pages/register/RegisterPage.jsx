import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Stepper from '../../components/register/Stepper';
import RoleSelectStep from './RoleSelectStep';
import BasicInfoStep from './BasicInfoStep';
import DocumentsStep from './DocumentsStep';
import ReviewStep from './ReviewStep';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);

  const [form, setForm] = useState({
    role: null,
    // Basic info fields are dynamic per role; keep a flexible object.
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    address: '',
    password: '',
    confirmPassword: '',

    // Documents are dynamic per role; keys come from ROLE_FIELDS[role].documents
    documents: {},
  });

  const steps = useMemo(
    () => [
      { title: 'Role', component: RoleSelectStep },
      { title: 'Basic Info', component: BasicInfoStep },
      { title: 'Documents', component: DocumentsStep },
      { title: 'Review', component: ReviewStep },
    ],
    []
  );

  const goNext = () => setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStepIndex((s) => Math.max(s - 1, 0));

  const StepComponent = steps[stepIndex]?.component;

  const canProceed = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return !!form.role;
      case 1:
        return form.fullName.trim().length >= 2 && form.email.includes('@');
      case 2:
        return true; // documents are optional for demo
      case 3:
        return true;
      default:
        return false;
    }
  }, [form, stepIndex]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    // Demo-only registration: log in as the selected role.
    login({ email: form.email || 'user@smartcity.gov', role: form.role || 'admin' });

    // login() navigates to '/'; keep this for safety.
    setTimeout(() => navigate('/'), 0);
  };

  return (
    <div className="min-h-screen bg-govlight-bg dark:bg-govdark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glassmorphism rounded-3xl border border-white/60 dark:border-slate-700/50 shadow-glass-light dark:shadow-glass-dark p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Create account</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Register in a few steps. This demo stores data locally only.
              </p>
            </div>
            <div className="hidden sm:block">
              <Stepper currentStep={stepIndex} steps={steps} />
            </div>
          </div>

          <form onSubmit={stepIndex === steps.length - 1 ? handleSubmit : undefined}>
            <div className="sm:hidden mb-5">
              <Stepper currentStep={stepIndex} steps={steps} />
            </div>

            <div className="relative">
              {StepComponent ? (
                <motion.div
                  key={steps[stepIndex]?.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepComponent
                    selectedRole={form.role}
                    onSelect={(roleId) => setForm((f) => ({ ...f, role: roleId }))}
                    form={form}
                    setForm={setForm}
                    canProceed={canProceed}
                    goNext={goNext}
                    goBack={goBack}
                  />
                </motion.div>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                  stepIndex === 0
                    ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    : 'bg-white/60 dark:bg-slate-900/40 border-white/60 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-900/70'
                }`}
              >
                Back
              </button>

              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    !canProceed
                      ? 'opacity-50 cursor-not-allowed bg-primary/20 text-primary'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    !canProceed
                      ? 'opacity-50 cursor-not-allowed bg-primary/20 text-primary'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  Submit registration
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;

