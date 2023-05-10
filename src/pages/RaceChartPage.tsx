import ChartRacePlot from "../components/ChartRacePlot";
import {Stack } from '@mui/material';

export default function RaceChartPage() {
  return (
    <Stack style={{ margin: 100 }}>
     <ChartRacePlot label="Race" />
    </Stack>
  );
}
