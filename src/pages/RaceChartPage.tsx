import ChartRacePlot from "../components/ChartRacePlot";
import { Container } from "@mui/material";
import { cLThemeColors } from "../constants/colors";

export default function RaceChartPage() {
  return (
    <Container
      maxWidth={false}
      style={{
        // minWidth: "100%",
        border: "solid",

        // height: "100vh",
        // flex: 1,
        width: "100vw",
        // height: "100%",
        // padding: 100,
        backgroundColor: cLThemeColors.cream,
      }}
    >
      <ChartRacePlot />
    </Container>
  );
}
