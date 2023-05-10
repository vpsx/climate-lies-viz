import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import moment from "moment";
import {
  earliestTweetDate,
  latestTweetDate,
} from "../constants/tweetsMetadata";

const dateFormat = "DD-MM-YYYY";

function calculateDateRange(startDateStr: string, endDateStr: string) {
  //calculate the difference in start and end date fron api and assign min and max to range
  let startDate = moment(startDateStr, "DD-MM-YYYY");
  let endDate = moment(endDateStr, "DD-MM-YYYY");
  return endDate.diff(startDate, "days");
}

function convertSliderValueToDate(value: number) {
  const newDate = moment(earliestTweetDate, dateFormat).add(value, "days");
  return moment(newDate).format(dateFormat);
}

const maxSliderValue = calculateDateRange(earliestTweetDate, latestTweetDate);

const marks = [
  {
    value: 0,
    label: "30-04-2007",
  },
  //2809 is about half of maxSliderValue
  {
    value: 2809,
    label: "07-01-2015",
  },
  {
    value: maxSliderValue,
    label: "31-12-2022",
  },
];

export default function DateSlider(props: {
  onChange: (date: string) => void;
}) {
  const handleSliderChange = (
    _: Event,
    value: number | Array<number>,
    __: number
  ) => {
    console.log("value", value);

    props.onChange(convertSliderValueToDate(value as number));
  };

  return (
    <Slider
      aria-label="Always visible"
      defaultValue={80}
      valueLabelFormat={convertSliderValueToDate}
      marks={marks}
      valueLabelDisplay="on"
      min={0}
      max={maxSliderValue}
      onChange={handleSliderChange}
    />
  );
}
