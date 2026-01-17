import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCreateTask } from '../../hooks/useTasks';

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const createTask = useCreateTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask.mutate(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          navigate('/');
        }
      }
    );
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
        <Typography variant="h5">
          Создание новой задачи
        </Typography>
        <div style={{ width: 100 }}></div>
      </Box>

      {createTask.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Ошибка при создании задачи
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название задачи *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          error={!title.trim()}
          helperText={!title.trim() ? 'Название обязательно' : ''}
        />

        <TextField
          fullWidth
          label="Описание задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!title.trim() || createTask.isPending}
          >
            {createTask.isPending ? 'Создание...' : 'Создать задачу'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};