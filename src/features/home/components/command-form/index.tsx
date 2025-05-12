import { Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Slider,
  FormControl,
  FormHelperText,
  Stack,
} from '@mui/material';
import { PlayArrow, RestartAlt } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/shared/hooks/use-redux';
import { animateManipulator } from '@/shared/animation-controller';
import {
  setOriginalCommand,
  resetExecution,
  startExecution,
  setAnimationSpeed,
} from '@/shared/store/commands-slice';

interface FormInputs {
  command: string;
}

export const CommandForm = () => {
  const dispatch = useDispatch();
  const { optimizedCommand, executionStatus, animationSpeed, isAnimating } =
    useAppSelector((state) => state.command);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      command: '',
    },
  });

  const onSubmit = (data: FormInputs) => {
    dispatch(setOriginalCommand(data.command));
    dispatch(resetExecution());
  };

  const handleStartExecution = () => {
    dispatch(startExecution());
  };

  const handleReset = () => {
    dispatch(resetExecution());
  };

  const handleSpeedChange = (_event: Event, newValue: number | number[]) => {
    dispatch(setAnimationSpeed(newValue as number));
  };

  useEffect(() => {
    if (executionStatus === 'executing' && optimizedCommand) {
      const cancelAnimation = animateManipulator(
        optimizedCommand,
        animationSpeed,
        dispatch,
      );

      return cancelAnimation;
    }
  }, [executionStatus, optimizedCommand, animationSpeed, dispatch]);

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography gutterBottom variant='h6'>
        Ввод команд
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth error={!!errors.command} sx={{ mb: 2 }}>
          <Controller
            control={control}
            name='command'
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                disabled={isAnimating}
                error={!!errors.command}
                label='Последовательность команд'
                placeholder='Например: ЛПВНОБ'
                variant='outlined'
              />
            )}
            rules={{
              required: 'Введите команду',
              pattern: {
                value: /^[ЛПВНОБ]+$/,
                message: 'Допустимы только символы: Л, П, В, Н, О, Б',
              },
            }}
          />
          {errors.command && (
            <FormHelperText>{errors.command.message}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            color='primary'
            disabled={isAnimating}
            type='submit'
            variant='contained'
          >
            Оптимизировать
          </Button>

          <Button
            color='success'
            disabled={!optimizedCommand || isAnimating}
            startIcon={<PlayArrow />}
            variant='contained'
            onClick={handleStartExecution}
          >
            Выполнить
          </Button>

          <Button
            disabled={isAnimating}
            startIcon={<RestartAlt />}
            variant='outlined'
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </Box>
      </form>

      {optimizedCommand && (
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom variant='subtitle2'>
            Оптимизированная команда:
          </Typography>
          <Typography
            sx={{
              p: 1,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontFamily: 'monospace',
            }}
            variant='body1'
          >
            {optimizedCommand}
          </Typography>
        </Box>
      )}

      <Stack alignItems='center' direction='row' spacing={2} sx={{ mt: 3 }}>
        <Typography variant='body2'>Скорость анимации:</Typography>
        <Slider
          disabled={isAnimating}
          max={1000}
          min={100}
          step={100}
          sx={{ maxWidth: 300 }}
          value={animationSpeed}
          valueLabelDisplay='auto'
          valueLabelFormat={(value) => `${value}мс`}
          onChange={handleSpeedChange}
        />
      </Stack>
    </Paper>
  );
};
