export const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

export const formatDate = (value: string) => {
  if (!value) return 'No date';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const isOverdue = (date: string, completed: boolean) =>
  !completed && !!date && date < todayISO();
