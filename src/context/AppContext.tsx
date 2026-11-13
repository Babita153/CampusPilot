import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, ApplicationStatus, JobApplication, Task, TaskPriority } from '../types';
import { makeId, todayISO } from '../utils/helpers';

const STORAGE_KEY = '@campuspilot_data_v1';
const initialData: AppData = {
  tasks: [
    { id: 'sample-1', title: 'Prepare DSA revision notes', dueDate: todayISO(), priority: 'High', completed: false, createdAt: new Date().toISOString() },
    { id: 'sample-2', title: 'Update resume and portfolio', dueDate: todayISO(), priority: 'Medium', completed: true, createdAt: new Date().toISOString() },
  ],
  applications: [
    { id: 'job-1', company: 'TechNova', role: 'React Native Developer', location: 'Remote', appliedDate: todayISO(), status: 'Interview' },
    { id: 'job-2', company: 'BrightLabs', role: 'Frontend Intern', location: 'Mohali', appliedDate: todayISO(), status: 'Applied' },
  ],
};

interface AppContextValue {
  data: AppData;
  loading: boolean;
  error: string | null;
  addTask: (input: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addApplication: (input: Omit<JobApplication, 'id'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  deleteApplication: (id: string) => void;
  resetData: () => void;
}
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && active) setData(JSON.parse(stored) as AppData);
      } catch {
        if (active) setError('Could not load saved data. You can still use the app.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (loading) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      .then(() => setError(null))
      .catch(() => setError('Changes could not be saved. Check device storage.'));
  }, [data, loading]);

  const addTask = useCallback((input: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    setData(prev => ({ ...prev, tasks: [{ ...input, id: makeId(), completed: false, createdAt: new Date().toISOString() }, ...prev.tasks] }));
  }, []);
  const toggleTask = useCallback((id: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) }));
  }, []);
  const deleteTask = useCallback((id: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  }, []);
  const addApplication = useCallback((input: Omit<JobApplication, 'id'>) => {
    setData(prev => ({ ...prev, applications: [{ ...input, id: makeId() }, ...prev.applications] }));
  }, []);
  const updateApplicationStatus = useCallback((id: string, status: ApplicationStatus) => {
    setData(prev => ({ ...prev, applications: prev.applications.map(a => a.id === id ? { ...a, status } : a) }));
  }, []);
  const deleteApplication = useCallback((id: string) => {
    setData(prev => ({ ...prev, applications: prev.applications.filter(a => a.id !== id) }));
  }, []);
  const resetData = useCallback(() => setData({ tasks: [], applications: [] }), []);

  const value = useMemo(() => ({ data, loading, error, addTask, toggleTask, deleteTask, addApplication, updateApplicationStatus, deleteApplication, resetData }),
    [data, loading, error, addTask, toggleTask, deleteTask, addApplication, updateApplicationStatus, deleteApplication, resetData]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside AppProvider');
  return context;
}
