import { Container } from '@mui/material';
import Title from '../components/Layout/Title';
import Login from '../components/Auth/Login';

function LoginPage() {
  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Login" />
      <Login />
    </Container>
  );
}

export default LoginPage;
