import { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
} from '@mui/material';

const ProjectForm: React.FC = () => {


  return (
    <Paper elevation={3} style={{ padding: 24, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>Создание проекта</Typography>
      <Stack spacing={2}>
        <TextField label="Название" />
        <TextField label="Дата начала" type="date" />
        <TextField label="Длина сегмента (дней)" type="number" />
        <TextField label="Количество сегментов" type="number" />
        <TextField label="Минимальный процент" type="number" />
        <Button variant="contained">Создать</Button>
      </Stack>
    </Paper>
  );
};

export default ProjectForm;
