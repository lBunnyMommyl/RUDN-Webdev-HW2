import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        >
          <DashboardIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Доска задач
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<DashboardIcon />}
          >
            Все задачи
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/create"
            startIcon={<AddTaskIcon />}
          >
            Новая задача
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};