import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { ProjectFormData } from '../../types';

const mockProject: ProjectFormData = {
  title: 'Mock Project',
  start_date: '2025-05-08',
  segment_length: 7,
  total_segments: 10,
  minimum_percentage: 60,
};

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<ProjectFormData | null>(null);

  useEffect(() => {
    setValues(mockProject);
  }, []);

  const handleChange = (field: keyof ProjectFormData, value: string | number) => {
    if (!values) return;
    setValues(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSubmit = () => {
    console.log('Submit:', values);
    navigate(`/project/${id}`);
  };

  const handleDelete = () => {
    console.log('Delete project', id);
    navigate('/');
  };

  if (!values) return null;

  return (
    <ProjectForm
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      error={error}
      submitLabel="Save"
    />
  );
};

export default ProjectEdit;
