import { Paper, Typography, Box } from '@mui/material';
import { TaskCard } from '../TaskCard';
import type { Task } from '../../types/task';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: 0 | 1 | 2;
}

export const Column = ({ title, tasks, status }: ColumnProps) => {
  const statusColors = {
    0: { 
      bg: '#FFF3E0',
      border: '#FF9800',
      text: '#E65100'
    },
    1: { 
      bg: '#E3F2FD',
      border: '#2196F3',
      text: '#0D47A1' 
    },
    2: { 
      bg: '#E8F5E9', 
      border: '#4CAF50', 
      text: '#1B5E20' 
    }
  };

  const colors = statusColors[status];

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 0,
        height: '75vh',
        minHeight: '500px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: `3px solid ${colors.border}`,
        borderRadius: '12px',
        background: `linear-gradient(180deg, ${colors.bg} 0%, #FFFFFF 100%)`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px ${colors.border}20`
      }}
    >
      <Box 
        sx={{ 
          p: 2,
          backgroundColor: colors.border,
          borderBottom: `3px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {title}
        </Typography>
        
        <Box 
          sx={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            px: 1.5,
            py: 0.5
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold',
              color: colors.text
            }}
          >
            {tasks.length} задач
          </Typography>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          flex: 1,
          p: 2,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.border,
            borderRadius: '4px',
          }
        }}
      >
        {tasks.length === 0 ? (
          <Box 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              py: 8
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: `${colors.border}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: colors.border,
                  opacity: 0.5
                }}
              >
                📋
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: colors.text,
                opacity: 0.7,
                maxWidth: '200px'
              }}
            >
              Нет задач в этой колонке
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: colors.text,
                opacity: 0.5,
                mt: 1
              }}
            >
              Создайте новую задачу
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};