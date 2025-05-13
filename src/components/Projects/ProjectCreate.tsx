import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCreateForm from './ProjectCreateForm';
import { ProjectFormData } from '../../types';

const ProjectCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState<ProjectFormData>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');

    return {
      title: '',
      start_date: `${yyyy}-${mm}-${dd}`,
      segment_length: 7,
      total_segments: 12,
      minimum_percentage: 70,
    };
  });

  const handleChange = (field: keyof ProjectFormData, value: string | number) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.success && data.project_id) {
        navigate(`/project/${data.project_id}`);
      } else {
        setError('Failed to create the project.');
      }
    } catch {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <ProjectCreateForm
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default ProjectCreate;
