// components/ProjectForm.tsx
import { TextField, Stack, Button, Alert } from '@mui/material';
import { ProjectFormData } from '../../types';

interface ProjectFormProps {
  values: ProjectFormData;
  onChange: (field: keyof ProjectFormData, value: string | number) => void;
  onSubmit: () => void;
  error: string | null;
  submitLabel: string;
  onDelete?: () => void;
}

const ProjectForm = ({
  values,
  onChange,
  onSubmit,
  error,
  submitLabel,
  onDelete,
}: ProjectFormProps) => {
  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Title"
        value={values.title}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={values.start_date}
        onChange={(e) => onChange('start_date', e.target.value)}
      />
      <TextField
        label="Segment Length (days)"
        type="number"
        value={values.segment_length}
        onChange={(e) => onChange('segment_length', Number(e.target.value))}
      />
      <TextField
        label="Total Segments"
        type="number"
        value={values.total_segments}
        onChange={(e) => onChange('total_segments', Number(e.target.value))}
      />
      <TextField
        label="Minimum Percentage"
        type="number"
        value={values.minimum_percentage}
        onChange={(e) => onChange('minimum_percentage', Number(e.target.value))}
      />
      <Button variant="contained" onClick={onSubmit}>
        {submitLabel}
      </Button>
      {onDelete && (
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
      )}
    </Stack>
  );
};

export default ProjectForm;
