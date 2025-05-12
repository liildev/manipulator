import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useMatchRoute, Link } from '@tanstack/react-router';

type Props = {
  drawerWidth: number;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isMobile: boolean;
};

export const Navigation = ({
  drawerWidth,
  mobileOpen,
  onDrawerToggle,
  isMobile,
}: Props) => {
  const matchRoute = useMatchRoute();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Command History', icon: <HistoryIcon />, path: '/history' },
  ];

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isMatch = matchRoute({ to: item.path, fuzzy: true });

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                selected={Boolean(isMatch)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Box
      component='nav'
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={mobileOpen}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant='temporary'
          onClose={onDrawerToggle}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          open
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};
