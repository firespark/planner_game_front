import { List } from '@mui/material';
import { TaskData } from '../../types';
import Task from './Task';

interface Props {
  tasks: TaskData[];
  isPast: boolean;
  onEdit: (task: TaskData) => void;
  onToggleDone?: (id: number) => void;
}

const TaskListContent = ({ tasks, isPast, onEdit, onToggleDone }: Props) => {
  const undone = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <>
      <List dense>
        {undone.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={!isPast ? () => onEdit(task) : undefined}
            onToggleDone={!isPast && onToggleDone ? () => onToggleDone(task.id) : undefined}
          />
        ))}
      </List>
      {done.length > 0 && (
        <List dense>
          {done.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={!isPast ? () => onEdit(task) : undefined}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskListContent;
