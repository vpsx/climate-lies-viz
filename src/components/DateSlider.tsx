import { Slider, Stack, IconButton } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { useState, useEffect } from "react";
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

const iconStyle = {
  width: 50,
  height: 50,
};

export default function DateSlider(props: {
  onChange: (date: string) => void;
}) {
  const [value, setValue] = useState<number>(Math.floor(maxSliderValue /2));
  const [playing, setPlaying] = useState(true);
  const handleSliderChange = (
    _: Event,
    value: number | Array<number>,
    __: number
  ) => {
    props.onChange(convertSliderValueToDate(value as number));
    setValue(value as number);
  };

  useEffect(() => {
    if (playing) {
      const sliderTimer = setInterval(() => {
        setValue((value) => {
          //loop around
          if (value >= maxSliderValue) {
            return 1;
          } else {
            return value + Math.floor(maxSliderValue / 2000);
          }
        });
        props.onChange(convertSliderValueToDate(value as number));
      }, 100);
      return () => {
        clearInterval(sliderTimer);
      };
    }
  }, [playing, value]);

  return (
    <Stack
      style={{
        flexDirection: "row",
      }}
    >
      <IconButton
        style={{ ...iconStyle, marginLeft: -35 }}
        onClick={() => {
          setPlaying(!playing);
        }}
      >
        {playing ? (
          <PauseIcon style={iconStyle} />
        ) : (
          <PlayIcon style={iconStyle} />
        )}
      </IconButton>
      <Stack style={{ width: 70 }} />
      <Slider
        value={value}
        defaultValue={Math.floor(maxSliderValue / 2)}
        valueLabelFormat={convertSliderValueToDate}
        marks={marks}
        valueLabelDisplay="off"
        min={0}
        max={maxSliderValue}
        onChange={handleSliderChange}
      />
    </Stack>
  );
}
