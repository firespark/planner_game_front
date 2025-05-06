import { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const ProjectForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [segmentLength, setSegmentLength] = useState(7);
  const [totalSegments, setTotalSegments] = useState(12);
  const [minimumPercentage, setMinimumPercentage] = useState(70);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!title.trim()) return setError('Title is required.');
    if (!startDate) return setError('Start date is required.');
    if (!segmentLength || segmentLength < 1 || segmentLength > 14) return setError('Segment length must be from 1 to 14.');
    if (!totalSegments || totalSegments < 1 || totalSegments > 24) return setError('Total segments must be from 1 to 24.');
    if (!minimumPercentage || minimumPercentage < 1 || minimumPercentage > 100) return setError('Minimum percentage must be from 1 to 100.');

    const payload = {
      title,
      start_date: startDate,
      segment_length: segmentLength,
      total_segments: totalSegments,
      minimum_percentage: minimumPercentage,
    };

    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError('Failed to create the project.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 24, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>Create Project</Typography>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Project created successfully!</Alert>}
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={e => setStartDate(e.target.value)} />
        <TextField label="Segment Length (days)" type="number" value={segmentLength} onChange={e => setSegmentLength(Number(e.target.value))} />
        <TextField label="Total Segments" type="number" value={totalSegments} onChange={e => setTotalSegments(Number(e.target.value))} />
        <TextField label="Minimum Percentage" type="number" value={minimumPercentage} onChange={e => setMinimumPercentage(Number(e.target.value))} />
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
      </Stack>
    </Paper>
  );
};

export default ProjectForm;
