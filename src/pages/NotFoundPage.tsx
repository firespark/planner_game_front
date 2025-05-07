import { useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import Title from '../components/Layout/Title';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="404 Not Found" />
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
