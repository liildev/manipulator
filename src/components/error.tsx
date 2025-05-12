import { ErrorComponentProps, Link } from '@tanstack/react-router';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button, Typography, Stack, useTheme } from '@mui/material';

export const Error = ({ reset }: ErrorComponentProps) => {
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
        height: '100svh',
        p: 2,
      }}
    >
      <WarningIcon
        sx={{
          fontSize: 80,
          color: theme.palette.error.main,
        }}
      />

      <Typography component='h1' variant='h4'>
        Что-то пошло не так
      </Typography>

      <Typography variant='body1'>
        Мы уже работаем над решением проблемы
        <br />
        Попробуйте вернуться на главную или зайти позже.
      </Typography>

      <Stack
        direction='row'
        spacing={2}
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        <Button
          component={Link}
          sx={{
            textDecoration: 'none',
          }}
          to='/'
          variant='contained'
        >
          Home
        </Button>

        <Button variant='outlined' onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
};
