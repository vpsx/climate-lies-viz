import { Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import ChartRace from "react-chart-race";
import DateSlider from "./DateSlider";
import tweetsJson from "../assets/tweet_aggregate.json";
import { cLThemeColors } from "../constants/colors";
import { climateArguments } from "../constants/tweetsMetadata";
import { getDisplayDate, getPreviousDate } from "../utils/dateUtils";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ChartRaceLegend from "./ChartRaceLegend";

type TweetsJson = {
  [key: string]: {
    [key: string]: number;
  };
};
const typedTweetsJson: TweetsJson = tweetsJson;

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
function getBestMatchDateInTweetsJsonFile(dateString: string): {
  [key: string]: number;
} {
  let dateStr = dateString;
  while (!(dateStr in typedTweetsJson)) {
    dateStr = getPreviousDate(dateStr);
  }
  return typedTweetsJson[dateStr];
}

const ChartRacePlot: React.FC = () => {
  const [data, setData] = useState(
    getChartData(getBestMatchDateInTweetsJsonFile(defaultChartDate))
  );
  const [selectedDate, setSelectedDate] = useState(
    getDisplayDate(defaultChartDate)
  );

  const { width } = useWindowDimensions();

  const handleChange = (value: string) => {
    setData(getChartData(getBestMatchDateInTweetsJsonFile(value)));
    setSelectedDate(getDisplayDate(value));
  };

  return (
    <div>
      <Typography style={titleStyle}>Climate </Typography>
      <Typography style={titleStyle}>&nbsp;</Typography>
      <Typography style={{ ...titleStyle, color: cLThemeColors.lieRed }}>
        Lies
      </Typography>
      <Typography style={titleStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
      <Typography style={titleStyle}>{selectedDate}</Typography>
      <Stack style={{ height: 30 }} />
      <Stack style={{ padding: 40 }}>
        <DateSlider onChange={handleChange} />
      </Stack>
      <Stack style={{ height: 25 }} />
      <ChartRaceLegend />
      <ChartRace
        data={data}
        backgroundColor={cLThemeColors.cream}
        width={width - 90}
        gap={8}
        titleStyle={{
          font: "normal 400 13px Arial",
          color: cLThemeColors.black,
        }}
        valueStyle={{ font: "normal 800 11px Arial", color: cLThemeColors.red }}
      />
    </div>
  );
};
export default ChartRacePlot;
