import { Box, CircularProgress, Alert, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Column } from '../../components/Column';
import { useTasks } from '../../hooks/useTasks';
import AddIcon from '@mui/icons-material/Add';

const COLUMNS = [
  { id: 0 as const, title: 'К выполнению' },
  { id: 1 as const, title: 'В работе' },
  { id: 2 as const, title: 'Выполнено' }
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: tasks = [], isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">
          Ошибка при загрузке задач
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Kanban Доска
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Управляйте своими задачами эффективно
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
          size="large"
          sx={{
            borderRadius: '8px',
            px: 3,
            py: 1
          }}
        >
          Новая задача
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10,
            backgroundColor: 'background.default',
            borderRadius: '12px',
            border: '2px dashed',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Ваша доска пуста
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Начните работу, создав первую задачу
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
            size="large"
            sx={{ mt: 2 }}
          >
            Создать первую задачу
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          width: '100%'
        }}>
          {COLUMNS.map(column => (
            <Box 
              key={column.id}
              sx={{ 
                flex: 1,
                minWidth: { xs: '100%', md: '320px' }
              }}
            >
              <Column
                title={column.title}
                tasks={tasks.filter(task => task.status === column.id)}
                status={column.id}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};