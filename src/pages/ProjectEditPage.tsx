import { Container } from '@mui/material';
import Title from '../components/Layout/Title';
import ProjectEdit from '../components/Projects/ProjectEdit';

function ProjectCreatePage() {
  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Edit Project" />
      <ProjectEdit />
    </Container>
  );
}

export default ProjectCreatePage;
