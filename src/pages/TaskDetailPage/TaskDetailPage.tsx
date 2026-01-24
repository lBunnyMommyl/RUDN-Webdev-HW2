import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Alert,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTasks, useUpdateTask, useDeleteTask } from '../../hooks/useTasks';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tasks = [] } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return (
      <Alert severity="warning" sx={{ mt: 4 }}>
        Задача не найдена
      </Alert>
    );
  }

  const statusText = ['К выполнению', 'В работе', 'Выполнено'][task.status];

  const handleStatusChange = (newStatus: number) => {
    updateTask.mutate({ id: task.id, status: newStatus as 0 | 1 | 2 });
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id);
    navigate('/');
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Назад
        </Button>
        <Chip label={statusText} color="primary" />
      </Box>

      <Typography variant="h4" gutterBottom>
        #{task.id} - {task.title}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Описание:
        </Typography>
        <Typography variant="body1">
          {task.description || 'Описание отсутствует'}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Дата создания:
        </Typography>
        <Typography variant="body1">
          {task.createdAt.toLocaleDateString('ru-RU')}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="subtitle1" sx={{ alignSelf: 'center' }}>
          Изменить статус:
        </Typography>
        {[0, 1, 2].map(status => (
          <Button
            key={status}
            variant={task.status === status ? 'contained' : 'outlined'}
            disabled={task.status === status}
            onClick={() => handleStatusChange(status)}
          >
            {['К выполнению', 'В работе', 'Выполнено'][status]}
          </Button>
        ))}

        <Button
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          sx={{ ml: 'auto' }}
          onClick={() => navigate(`/task/${task.id}/edit`)}
        >
          Редактировать
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </Box>
    </Paper>
  );
};