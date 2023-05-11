import ChartRacePlot from "../components/ChartRacePlot";
import { Box } from "@mui/material";
import { cLThemeColors } from "../constants/colors";

export default function RaceChartPage() {
  return (
    <Box
      minHeight="100vh"
      padding={2}
      style={{
        backgroundColor: cLThemeColors.cream,
      }}
    >
      <ChartRacePlot />
    </Box>
  );
}
