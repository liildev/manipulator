import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Info } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-redux';
import { clearHistory } from '@/shared/store/commands-slice';
import { HistoryEntry } from '@/types/commands';

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.command);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const handleOpenDetails = (entry: HistoryEntry) => {
    setSelectedEntry(entry);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h6'>История команд</Typography>

        <Button
          color='error'
          disabled={history.length === 0}
          size='small'
          variant='outlined'
          onClick={handleClearHistory}
        >
          Очистить
        </Button>
      </Box>

      {history.length === 0 ? (
        <Typography
          color='text.secondary'
          sx={{ textAlign: 'center', py: 4 }}
          variant='body2'
        >
          История пуста. Выполните команду, чтобы увидеть результаты.
        </Typography>
      ) : (
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Команда</TableCell>
                <TableCell>Оптимизированная</TableCell>
                <TableCell>Время</TableCell>
                <TableCell align='center'>Детали</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'monospace',
                    }}
                  >
                    {entry.originalCommand}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'monospace',
                    }}
                  >
                    {entry.optimizedCommand}
                  </TableCell>
                  <TableCell>{formatDate(entry.timestamp)}</TableCell>
                  <TableCell align='center'>
                    <Tooltip title='Подробности'>
                      <IconButton
                        size='small'
                        onClick={() => handleOpenDetails(entry)}
                      >
                        <Info fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Details Dialog */}
      <Dialog maxWidth='md' open={detailsOpen} onClose={handleCloseDetails}>
        <DialogTitle>Детали выполнения команды</DialogTitle>
        <DialogContent dividers>
          {selectedEntry && (
            <Box sx={{ minWidth: 400 }}>
              <Typography gutterBottom variant='subtitle2'>
                Исходная команда:
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  mb: 2,
                  fontFamily: 'monospace',
                }}
                variant='body2'
              >
                {selectedEntry.originalCommand}
              </Typography>

              <Typography gutterBottom variant='subtitle2'>
                Оптимизированная команда:
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  mb: 2,
                  fontFamily: 'monospace',
                }}
                variant='body2'
              >
                {selectedEntry.optimizedCommand}
              </Typography>

              <Typography gutterBottom variant='subtitle2'>
                Время выполнения:
              </Typography>
              <Typography sx={{ mb: 2 }} variant='body2'>
                {formatDate(selectedEntry.timestamp)}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                <Box>
                  <Typography gutterBottom variant='subtitle2'>
                    Начальное положение:
                  </Typography>
                  <Typography variant='body2'>
                    Манипулятор: (
                    {selectedEntry.initialState.manipulatorPosition.x},{' '}
                    {selectedEntry.initialState.manipulatorPosition.y})
                  </Typography>
                </Box>

                <Box>
                  <Typography gutterBottom variant='subtitle2'>
                    Конечное положение:
                  </Typography>
                  <Typography variant='body2'>
                    Манипулятор: (
                    {selectedEntry.finalState.manipulatorPosition.x},{' '}
                    {selectedEntry.finalState.manipulatorPosition.y})
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
