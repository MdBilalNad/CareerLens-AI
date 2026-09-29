import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { exportAllUserData } from '../services/storage';
import { Download, Trash2, Key, Check } from 'lucide-react';

interface SettingsPageProps {
  navigate: (path: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ navigate }) => {
  const { user, deleteAccount, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordStatus('New password must be at least 8 characters long.');
      return;
    }
    // Update password simulation
    setPasswordStatus('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordStatus(null), 3000);
  };

  const handleExportData = () => {
    if (!user) return;
    const jsonString = exportAllUserData(user.id);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careerlens_data_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = () => {
    deleteAccount();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Account and Data Settings
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Manage your credentials, export your stored resume analyses, or permanently delete all data.
        </p>
      </div>

      {/* Account Info */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 space-y-4">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Name</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {user?.fullName || 'Guest Candidate'}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Email</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {user?.email || 'guest@example.com'}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Key size={16} className="text-neutral-500" />
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Change Password
          </h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-sm text-xs">
          <div>
            <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-neutral-600 dark:text-neutral-400 mb-1">
              New Password (min 8 characters)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-500"
              placeholder="Enter new password"
            />
          </div>

          {passwordStatus && (
            <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Check size={13} />
              <span>{passwordStatus}</span>
            </div>
          )}

          <button type="submit" className="btn-secondary text-xs py-1.5 px-3">
            Update password
          </button>
        </form>
      </div>

      {/* Export Data */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Download size={16} className="text-neutral-500" />
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Export Your Analysis Data
          </h2>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Download a complete JSON export of your stored resume analyses, ATS category audits, deductions, and career roadmap recommendations.
        </p>
        <button
          onClick={handleExportData}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <Download size={13} />
          <span>Export all data (JSON)</span>
        </button>
      </div>

      {/* Delete Account and all Resumes */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 space-y-3">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Trash2 size={16} className="text-neutral-500" />
          <h2 className="text-sm font-semibold">
            Delete Account and All Resumes
          </h2>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Permanent data deletion. This action removes your account record, all uploaded resumes, past ATS audits, and generated roadmaps. This action cannot be undone.
        </p>

        {confirmDelete ? (
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xs space-y-2 text-xs">
            <span className="font-semibold block text-neutral-900 dark:text-neutral-100">
              Are you sure? All resumes and history will be permanently deleted.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteAll}
                className="btn-primary text-xs py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
              >
                Yes, delete everything now
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="btn-secondary text-xs py-1.5 px-3 text-neutral-700 dark:text-neutral-300"
          >
            Delete account and all resumes
          </button>
        )}
      </div>
    </div>
  );
};
