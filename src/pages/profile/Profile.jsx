import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useData } from '../../contexts/DataContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Save } from 'lucide-react';

const Profile = () => {
  const { addToast } = useNotifications();
  const { addAuditLog } = useData();
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin Chief Officer",
    email: "rohi2@smartcity.gov",
    department: "Emergency Operations Center (EOC)",
    title: "System Logistics Director",
    phone: "+1 (555) 019-2834",
    avatar: null
  });

  const handleSubmit = () => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addAuditLog("Modify Administrator Profile", "Profile", "SYS-ADMIN-PROF", "Updated operator contact card details");
      addToast("Profile Details Saved", "Administrator profile modifications updated successfully.", "success");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto select-none animate-fade-in">
      
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-805 dark:text-slate-105 tracking-wide uppercase">
          Administrator Command Profile
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Edit your control room credentials, hotline contacts, and profile picture avatar.
        </p>
      </div>

      <div className="bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-150 dark:border-slate-850">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-650 text-white font-extrabold flex items-center justify-center text-2xl shadow-md flex-shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h3 className="font-extrabold text-slate-850 dark:text-slate-105 text-base tracking-wide">{profile.name}</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{profile.title} • {profile.department}</span>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Officer Name"
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <Input
              label="ホットライン (Hotline Number)"
              type="tel"
              required
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="EOC Agency Department"
              type="text"
              required
              value={profile.department}
              onChange={(e) => setProfile({ ...profile, department: e.target.value })}
            />

            <Input
              label="Security Rank Title"
              type="text"
              required
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
          </div>

          <Input
            label="Government Email address"
            type="email"
            required
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <Input
            label="Profile Avatar Picture"
            type="file"
            onChange={(e) => alert("Profile avatar picture parsed successfully into buffer.")}
          />

          <Button
            type="submit"
            variant="primary"
            icon={Save}
            className="font-semibold text-xs uppercase mt-3"
            isLoading={isSaving}
          >
            Update Command Profile
          </Button>

        </form>

      </div>

    </div>
  );
};

export default Profile;
