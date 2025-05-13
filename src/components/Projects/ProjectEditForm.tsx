import { TextField, Stack, Button, Alert } from '@mui/material';

interface Props {
  title: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
  error: string | null;
}

const ProjectEditForm = ({
  title,
  onChange,
  onSubmit,
  onDelete,
  error,
}: Props) => {
  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Title"
        value={title}
        onChange={(e) => onChange(e.target.value)}
      />

      <Button variant="contained" onClick={onSubmit}>
        Update
      </Button>
      <Button color="error" onClick={onDelete}>
        Delete
      </Button>
    </Stack>
  );
};

export default ProjectEditForm;
