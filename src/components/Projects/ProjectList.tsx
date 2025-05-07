import { Stack, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { ProjectData } from '../../types';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Stack spacing={3}>
      {projects.length === 0 ? (
        null
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))
      )}
    </Stack>
  );
};

export default ProjectList;
