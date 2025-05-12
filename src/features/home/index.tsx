import { Typography, Grid } from '@mui/material';

import { GridVisualizer } from './components/grid-visualizer';
import { CommandForm } from './components/command-form';

export const DashboardPage = () => {
  return (
    <>
      <Typography gutterBottom variant='h4'>
        Robot Control Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CommandForm />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <GridVisualizer />
        </Grid>
      </Grid>
    </>
  );
};
