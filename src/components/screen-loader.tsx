import { CircularProgress, Box } from '@mui/material';

export const ScreenLoader = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
    }}
  >
    <CircularProgress size={60} thickness={4} />
  </Box>
);
