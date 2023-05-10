import { Typography } from "@mui/material";
import React, { useState } from "react";
import ChartRace from "react-chart-race";
import DateSlider from "./DateSlider";
import tweetsJson from "../assets/tweet_aggregate.json";
import { cLThemeColors } from "../constants/colors";
import { climateArguments } from "../constants/tweetsMetadata";
import { getPreviousDate } from "../utils/dateUtils";

//eyeballed to match about halfway of the date slider
const defaultChartDate = "07-01-2015";

const titleStyle = {
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
  }
  return chartData;
};

/**
 * the exact date chosen on the slider may not be available in
 * the tweets aggregate file. if so, return the closest available date
 * that precedes the given date
 * @param dateString
 */
function getBestMatchDateInTweetsJsonFile(dateString: string) {
  let dateStr = dateString;
  while (!(dateStr in tweetsJson)) {
    dateStr = getPreviousDate(dateStr);
  }
  return tweetsJson[dateStr];
}

const ChartRacePlot: React.FC = () => {
  const [data, setData] = useState(getChartData(getBestMatchDateInTweetsJsonFile(defaultChartDate)));

  const handleChange = (value: string) => {
    setData(getChartData(getBestMatchDateInTweetsJsonFile(value)));
  };

  return (
    <>
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
    </>
  );
};
export default ChartRacePlot;
