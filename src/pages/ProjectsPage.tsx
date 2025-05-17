import { Container, CircularProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import Title from '../components/Layout/Title';
import CreateProjectButton from '../components/Projects/CreateProjectButton';
import ProjectList from '../components/Projects/ProjectList';
import { ProjectData } from '../types';
import { fetchProjects } from '../api/apiProjects';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetchProjects()
      .then(setProjects)
      .catch((error) => {
        if (error instanceof Error && error.message) {
          setError(error.message);
        } else {
          setError('Failed to load projects');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Projects" />
      {!loading && !error && projects.length < 5 && <CreateProjectButton />}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProjectList projects={projects} />
      )}
    </Container>
  );
};

export default ProjectsPage;
