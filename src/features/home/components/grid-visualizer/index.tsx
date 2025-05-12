import { Box, Paper, Typography, Snackbar, Alert } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-redux';
import { calculateGridBoundaries } from '@/shared/grid-utils';
import { resetExecution } from '@/shared/store/commands-slice';

const CELL_SIZE = 50;

export const GridVisualizer = () => {
  const dispatch = useAppDispatch();
  const {
    manipulatorPosition,
    samples,
    hasPickedSample,
    executionStatus,
    isAnimating,
  } = useAppSelector((state) => state.command);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const { minX, maxX, minY, maxY } = calculateGridBoundaries(
      manipulatorPosition.x,
      manipulatorPosition.y,
      samples,
    );

    const width = (maxX - minX + 1) * CELL_SIZE;
    const height = (maxY - minY + 1) * CELL_SIZE;
    const offsetX = -minX * CELL_SIZE;
    const offsetY = -minY * CELL_SIZE;

    setGridDimensions({ width, height, offsetX, offsetY });
  }, [manipulatorPosition, samples]);

  useEffect(() => {
    if (executionStatus === 'completed') {
      setSnackbarOpen(true);
    }
  }, [executionStatus]);

  useEffect(() => {
    return () => {
      if (executionStatus === 'completed') {
        dispatch(resetExecution());
      }
    };
  }, [executionStatus, dispatch]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography gutterBottom variant='h6'>
        Визуализация сетки
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: 1,
          bgcolor: '#f9f9f9',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minHeight: '100%',
            minWidth: '100%',
            width: gridDimensions.width,
            height: gridDimensions.height,
            backgroundImage:
              'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: gridDimensions.offsetX - 1,
              top: gridDimensions.offsetY - 1,
              width: CELL_SIZE + 2,
              height: CELL_SIZE + 2,
              border: '2px dashed #999',
              zIndex: 1,
            }}
          />

          {samples.map(
            (sample) =>
              !sample.isPickedUp && (
                <Box
                  key={sample.id}
                  sx={{
                    position: 'absolute',
                    left:
                      gridDimensions.offsetX +
                      sample.x * CELL_SIZE +
                      CELL_SIZE / 4,
                    top:
                      gridDimensions.offsetY +
                      sample.y * CELL_SIZE +
                      CELL_SIZE / 4,
                    width: CELL_SIZE / 2,
                    height: CELL_SIZE / 2,
                    bgcolor: '#4caf50',
                    borderRadius: '50%',
                    zIndex: 2,
                  }}
                />
              ),
          )}

          <Box
            sx={{
              position: 'absolute',
              left:
                gridDimensions.offsetX +
                manipulatorPosition.x * CELL_SIZE +
                CELL_SIZE / 6,
              top:
                gridDimensions.offsetY +
                manipulatorPosition.y * CELL_SIZE +
                CELL_SIZE / 6,
              width: (CELL_SIZE * 2) / 3,
              height: (CELL_SIZE * 2) / 3,
              bgcolor: '#1976d2',
              borderRadius: '4px',
              zIndex: 3,
              transition: 'left 0.3s, top 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hasPickedSample && (
              <Box
                sx={{
                  width: CELL_SIZE / 3,
                  height: CELL_SIZE / 3,
                  bgcolor: '#4caf50',
                  borderRadius: '50%',
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: 5,
              top: 5,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              p: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              zIndex: 4,
            }}
          >
            Координаты: ({manipulatorPosition.x}, {manipulatorPosition.y})
          </Box>

          {isAnimating && (
            <Box
              sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                p: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
                color: 'success.main',
                zIndex: 4,
              }}
            >
              Выполнение...
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity='success'
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar}
        >
          Операция успешно выполнена
        </Alert>
      </Snackbar>
    </Paper>
  );
};
