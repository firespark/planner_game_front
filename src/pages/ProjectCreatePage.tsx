import { Container } from '@mui/material';
import Title from '../components/Layout/Title';
import ProjectCreate from '../components/Projects/ProjectCreate';

function ProjectCreatePage() {
  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Create Project" />
      <ProjectCreate />
    </Container>
  );
}

export default ProjectCreatePage;
