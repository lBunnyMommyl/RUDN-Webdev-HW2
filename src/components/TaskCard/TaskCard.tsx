import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const statusColors = {
    0: 'warning', // К выполнению
    1: 'info',    // В работе
    2: 'success'  // Выполнено
  } as const;

  const statusText = ['К выполнению', 'В работе', 'Выполнено'][task.status];

  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 }
      }}
    >
      <CardContent 
        component={Link} 
        to={`/task/${task.id}`}
        style={{ 
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        <Chip 
          label={`#${task.id}`}
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography variant="h6" component="div" gutterBottom>
          {task.title}
        </Typography>
        <Chip 
          label={statusText}
          color={statusColors[task.status]}
          size="small"
        />
      </CardContent>
    </Card>
  );
};