import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  onClick: () => void;
}

const TaskCreateButton = ({ onClick }: Props) => (
  <Stack direction="row" alignItems="center" justifyContent="flex-end">
    <IconButton onClick={onClick} size="small">
      <AddIcon />
    </IconButton>
  </Stack>
);

export default TaskCreateButton;
