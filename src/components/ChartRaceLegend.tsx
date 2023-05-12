import { Typography, Stack } from "@mui/material";
import React from "react";
import { superClaims } from "../constants/tweetsMetadata";

const titleStyle = {
  fontWeight: 600,
  fontSize: 14,
  display: "inline-block",
};

const ChartRaceLegendItem: React.FC<{
  title: string;
  color: string;
}> = (props: { title: string; color: string }) => {
  return (
    <Stack style={{ marginRight: 30 }}>
      <Stack
        style={{
          height: 30,
          width: "100%",
          backgroundColor: props.color,
          borderRadius: 3,
        }}
      />
      <Typography style={titleStyle}>{props.title} </Typography>
    </Stack>
  );
};

const ChartRaceLegend: React.FC = () => {
  return (
    <Stack
      style={{
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        marginLeft: 20,
      }}
    >
      {Object.values(superClaims).map((superClaim) => (
        <ChartRaceLegendItem
          title={superClaim.title}
          color={superClaim.color}
        />
      ))}
    </Stack>
  );
};
export default ChartRaceLegend;
