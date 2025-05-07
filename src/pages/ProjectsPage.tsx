import { Container } from '@mui/material';
import Title from '../components/Layout/Title';
import CreateProjectButton from '../components/Projects/CreateProjectButton';
import ProjectList from '../components/Projects/ProjectList';

const ProjectsPage = () => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Projects" />
      <CreateProjectButton />
      <ProjectList />
    </Container>
  );
};

export default ProjectsPage;
