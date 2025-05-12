import type { LoginFormInputs } from '@/types/auth';

import { Controller } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useLoginMutation } from '@/shared/store/api';
import { setCredentials } from '@/shared/store/auth-slice';
import { useAppDispatch } from '@/shared/hooks/use-redux';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error: loginError }] = useLoginMutation();
  const error = loginError as { data?: { message?: string } };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await login(data).unwrap();

    dispatch(setCredentials(result));
    navigate({ to: '/' });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 450 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography gutterBottom align='center' component='h2' variant='h5'>
              Robot Manipulator Login
            </Typography>

            {loginError && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {error?.data?.message ||
                  'Invalid username or password. Please try again.'}
              </Alert>
            )}

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name='username'
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    fullWidth
                    autoComplete='username'
                    disabled={isLoading}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    id='username'
                    label='Username'
                    margin='normal'
                  />
                )}
                rules={{ required: 'Username is required' }}
              />

              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoComplete='current-password'
                    disabled={isLoading}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    id='password'
                    label='Password'
                    margin='normal'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={togglePasswordVisibility}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    type={showPassword ? 'text' : 'password'}
                  />
                )}
                rules={{ required: 'Password is required' }}
              />

              <Button
                fullWidth
                disabled={isLoading}
                size='large'
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                type='submit'
                variant='contained'
              >
                {isLoading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
