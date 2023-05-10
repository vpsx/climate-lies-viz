import { Button, Typography } from "@mui/material";
import React, { Component, useState } from "react";
import ChartRace from "react-chart-race";
import DateSlider from "./DateSlider";
//load json
import tweetsJson from "../assets/tweet_aggregate.json";
import { cLThemeColors } from "../constants/colors";
import { climateArguments } from "../constants/tweetsMetadata";

const defualtData = [
  { id: 0, title: "Ayfonkarahisar", value: 42, color: "#50c4fe" },
  { id: 1, title: "Kayseri", value: 38, color: "#3fc42d" },
  { id: 2, title: "Muğla", value: 76, color: "#c33178" },
  { id: 3, title: "Uşak", value: 30, color: "#423bce" },
  { id: 4, title: "Sivas", value: 58, color: "#c8303b" },
  // { id: 5, title: 'Konya', value: 16, color: '#2c2c2c' }
];

const titleStyle = {
  // ...fontStyles.avenirRegular,
  fontWeight: 700,
  fontSize: 42,
  display: "inline-block",
};

/**
 * helper function to convert slices of the tweet json object to an array expected by react-chart-race
 * @param dailyAggregate
 * @returns
 */
const getChartData = (dailyAggregate: { [key: string]: number }) => {
  let chartData: any = [];
  if (dailyAggregate) {
    for (const [key, value] of Object.entries(dailyAggregate)) {
      if (value > 0 && key in climateArguments) {
        chartData.push({
          id: key,
          title: climateArguments[key].label,
          value: value,
          color: climateArguments[key].color,
        });
      }
    }
    console.log("chartData", chartData);
  }
  return chartData;
};

const ChartRacePlot: React.FC = () => {
  const [data, setData] = useState(defualtData);

  const handleChange = (value: string) => {
    console.log("new date", value);
    //  console.log('tweetsJson', tweetsJson["2007-04-05"]);
    setData(getChartData(tweetsJson[value]));
  };

  return (
    <div>
      <Typography style={titleStyle}>Climate </Typography>
      <Typography style={{ ...titleStyle, color: cLThemeColors.red }}>
        Lies
      </Typography>
      <ChartRace
        data={data}
        backgroundColor={cLThemeColors.cream}
        width={760}
        padding={12}
        itemHeight={58}
        gap={12}
        titleStyle={{
          font: "normal 400 13px Arial",
          color: cLThemeColors.black,
        }}
        valueStyle={{ font: "normal 800 11px Arial", color: cLThemeColors.red }}
      />
      <DateSlider onChange={handleChange} />
    </div>
  );
};
export default ChartRacePlot;
