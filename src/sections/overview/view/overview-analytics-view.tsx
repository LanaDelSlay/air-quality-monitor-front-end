import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import Combining from 'src/layouts/components/Combining';
import Graph from 'src/layouts/components/mainGraph';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 }, paddingLeft: "-100px"}}>
        Analytics Overview
        <Grid container spacing={3}>
          <Grid xs={12} md={6} lg={8}>
            <Graph />
          </Grid>
          <Grid xs={12} md={6} lg={8}>
            <AgricultureIcon />
          </Grid>
        </Grid>
      </Typography>
    </DashboardContent>
  );
}
