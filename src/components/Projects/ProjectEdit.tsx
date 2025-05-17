import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectEditForm from './ProjectEditForm';
import { ProjectFormData } from '../../types';
import {
  fetchProject,
  fetchUpdateProject,
  fetchDeleteProject
} from '../../api/apiProjects';

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current || !id) return;
    fetchedRef.current = true;

    fetchProject(id)
      .then(setValues)
      .catch((error) => {
        if (error instanceof Error && error.message) {
          setError(error.message);
        } else {
          setError('Failed to load project');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (!values || !id) return;

    if (!values.title) {
      setError('Title is required');
      return;
    }

    try {
      await fetchUpdateProject(id, values.title);
      navigate('/');
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError('Failed to update the project');
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = confirm('Are you sure you want to delete this project and all its tasks?');
    if (!confirmed) return;

    try {
      await fetchDeleteProject(id);
      navigate('/');
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError('Failed to delete the project');
      }
    }
  };

  if (loading || !values) return null;

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
