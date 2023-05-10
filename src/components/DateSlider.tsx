import Slider from "@mui/material/Slider";
import {
  earliestTweetDate,
  latestTweetDate,
} from "../constants/tweetsMetadata";
import {
  calculateDateRange,
  convertSliderValueToDate,
} from "../utils/dateUtils";

const maxSliderValue = calculateDateRange(earliestTweetDate, latestTweetDate);
const marks = [
  {
    value: 0,
    label: "01-02-2007",
  },
  {
    value: Math.floor(maxSliderValue / 2),
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
    props.onChange(convertSliderValueToDate(value as number));
  };

  return (
    <Slider
      aria-label="Always visible"
      defaultValue={Math.floor(maxSliderValue / 2)}
      valueLabelFormat={convertSliderValueToDate}
      marks={marks}
      valueLabelDisplay="on"
      min={0}
      max={maxSliderValue}
      onChange={handleSliderChange}
    />
  );
}
