import { Link } from '@tanstack/react-router';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Typography, useTheme } from '@mui/material';

export const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: theme.spacing(2),
        width: '100%',
        height: '100vh',
        p: 3,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 80,
          color: theme.palette.error.main,
        }}
      />

      <Typography component='h1' variant='h4'>
        Page not found
      </Typography>

      <Typography variant='body1'>
        The page you are looking for doesn't exist or has been moved.
      </Typography>

      <Button
        component={Link}
        sx={{
          mt: 3,
          textDecoration: 'none',
          width: 'auto',
        }}
        to='/'
        variant='contained'
      >
        Home
      </Button>
    </Box>
  );
};
