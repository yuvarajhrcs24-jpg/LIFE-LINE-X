import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const SKILLS = ['medical', 'first_aid', 'rescue', 'food', 'logistics', 'coordination', 'shelter', 'counseling', 'swimming', 'boat', 'infrastructure', 'electrical', 'driving'];

export default function VolunteerProfile() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [skills, setSkills] = useState(user?.skills || []);
  const [experience, setExperience] = useState(user?.experience || '');
  const [available, setAvailable] = useState(user?.available !== false);
  const [saved, setSaved] = useState(false);

  const toggleSkill = (skill) => setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);

  const save = () => {
    updateProfile({ skills, experience, available, role: 'volunteer' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="card max-w-md">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">🙋 Volunteer Profile</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <button key={s} onClick={() => toggleSkill(s)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${skills.includes(s) ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Experience</label>
          <input className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="e.g. 2 years in disaster relief" value={experience} onChange={e => setExperience(e.target.value)} />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Available for tasks now</span>
        </label>
        <button onClick={save} className={`w-full py-2 rounded-lg font-medium text-sm ${saved ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
          {saved ? '✅ Saved!' : t('common.save')}
        </button>
      </div>
    </div>
  );
}
