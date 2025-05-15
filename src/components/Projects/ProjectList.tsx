import { Stack, CircularProgress } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { ProjectData } from '../../types';
import ProjectCard from './ProjectCard';
import { fetchProjects } from '../../api/apiProjects';

const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetchProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Stack spacing={3}>
      {projects.length === 0
        ? null
        : projects.map((project) => <ProjectCard key={project.id} {...project} />)}
    </Stack>
  );
};

export default ProjectList;
