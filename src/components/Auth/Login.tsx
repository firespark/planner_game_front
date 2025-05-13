import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Alert, TextField, Button, Box } from '@mui/material';
import { trySetAuthCode } from '../../helpers/authHelpers';

const Login = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    if (trySetAuthCode(code)) {
      navigate('/');
    } else {
      setError('Invalid code');
    }
  };

  return (
    <Box maxWidth={400} mx="auto">
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="password"
          fullWidth
        />
        <Button variant="contained" onClick={onSubmit} fullWidth>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
