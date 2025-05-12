import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { Outlet } from '@tanstack/react-router';

import { Navigation } from './navigation';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-redux';
import { useGetCurrentUserQuery } from '@/shared/store/api';
import { logout } from '@/shared/store/auth-slice';

const drawerWidth = 240;

export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { data: userData } = useGetCurrentUserQuery(undefined, {
    skip: !user?.accessToken,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/login' });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position='fixed' sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              sx={{ mr: 2 }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography sx={{ flexGrow: 1 }} variant='h6'>
            Robot Manipulator Control System
          </Typography>
          <Typography sx={{ mr: 2 }} variant='body1'>
            Welcome, {user?.username || userData?.username || 'User'}
          </Typography>
          <Tooltip title='Logout'>
            <IconButton color='inherit' onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Navigation
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onDrawerToggle={() => setMobileOpen(false)}
      />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
