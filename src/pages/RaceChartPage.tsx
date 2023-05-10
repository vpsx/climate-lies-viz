import ChartRacePlot from "../components/ChartRacePlot";
import { Stack } from "@mui/material";
import { cLThemeColors } from "../constants/colors";

export default function RaceChartPage() {
  return (
    <Stack
      style={{
        backgroundColor: cLThemeColors.cream,
      }}
    >
      <ChartRacePlot />
    </Stack>
  );
}
