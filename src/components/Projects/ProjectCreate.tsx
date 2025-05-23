import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCreateForm from './ProjectCreateForm';
import { ProjectFormData } from '../../types';
import { fetchCreateProject } from '../../api/apiProjects';

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

    if (!values.title) {
      setError('Title is required');
      return;
    }

    try {
      const projectId = await fetchCreateProject(values);
      navigate(`/project/${projectId}`);
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError('Failed to create the project');
      }
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
