import React, { useMemo, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import { Lock, Mail, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@smartcity.gov');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || '/';

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length >= 0;
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Enter your email to login.');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);

    // Local-only demo login
    login({ email, role: 'admin' });

    // login already navigates to '/'
    // but in case the redirect should respect `from`, keep it consistent:
    setTimeout(() => navigate(from, { replace: true }), 0);
  };

  if (isAuthenticated) {
    // If already logged in, skip directly to dashboard.
    return <NavigateToDashboard />;
  }

  return (
    <div className="min-h-screen bg-govlight-bg dark:bg-govdark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glassmorphism rounded-3xl border border-white/60 dark:border-slate-700/50 shadow-glass-light dark:shadow-glass-dark p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Login</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Use demo credentials to access the dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smartcity.gov"
              error={error.includes('email') ? error : undefined}
              required
              icon={Mail}
              className=""
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error.includes('password') ? error : undefined}
              required
            />

            {error && <p className="text-xs text-danger font-semibold -mt-2 animate-pulse">{error}</p>}

            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading}
              disabled={!canSubmit || isLoading}
              icon={Lock}
              iconPosition="left"
              className="mt-1"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-5 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">New here? </span>
            <Link to="/register" className="text-primary text-xs font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NavigateToDashboard = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
};

export default LoginPage;

