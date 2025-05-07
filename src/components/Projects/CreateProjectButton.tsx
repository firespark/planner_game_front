import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateProjectButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/project/create')}
      style={{ marginBottom: 24 }}
    >
      Create Project
    </Button>
  );
};

export default CreateProjectButton;
