import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectEditForm from './ProjectEditForm';
import { ProjectFormData } from '../../types';

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (data.success && data.project) {
          setValues(data.project);
        } else {
          setError('Failed to load project.');
        }
      } catch {
        setError('Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async () => {
    if (!values) return;

    if (!values.title) {
      setError('Title is required');
      return;
    }

    try {
      const res = await fetch(`/api/projects/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: values.title }),
      });

      const data = await res.json();

      if (data.success) {
        navigate(`/`);
      } else {
        setError('Failed to update the project.');
      }
    } catch {
      setError('Failed to connect to the server.');
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this project and all its tasks?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/projects/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        navigate('/');
      } else {
        setError('Failed to delete the project.');
      }
    } catch {
      setError('Failed to connect to the server.');
    }
  };

  if (loading) return null;
  if (!values) return null;

  return (
    <ProjectEditForm
      title={values.title}
      onChange={(val) =>
        setValues(prev => prev ? { ...prev, title: val } : null)
      }
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      error={error}
    />
  );
};

export default ProjectEdit;
