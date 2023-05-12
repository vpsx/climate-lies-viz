import { cLThemeColors } from "./colors";

const climateArguments: {
    [key: string]: {
      label: string;
      color: string;
    };
  } = {
    '1_1': { label: "Ice isn't melting", color: cLThemeColors.red },
    '1_2': { label: 'Heading into ice age', color: cLThemeColors.red },
    '1_3': { label: 'Weather is cold', color: cLThemeColors.red },
    '1_4': { label: 'Hiatus in warming', color: cLThemeColors.red },
    '1_5': { label: 'Oceans are cooling', color: cLThemeColors.red },
    '1_6': { label: 'Sea level rise is exaggerated', color: cLThemeColors.red },
    '1_7': { label: "Extremes aren't increasing", color: cLThemeColors.red },
    '1_8': { label: 'Changed the name', color: cLThemeColors.red },
    '2_1': { label: "It's natural cycles", color: cLThemeColors.pink },
    '2_2': { label: 'Non-Greenhouse Gas forcings', color: cLThemeColors.pink },
    '2_3': { label: 'No evidence for Greenhouse Effect', color: cLThemeColors.pink },
    '2_4': { label: 'CO2 not rising', color: cLThemeColors.pink },
    '2_5': { label: 'Emissions not raising CO2 levels', color: cLThemeColors.pink },
    '3_1': { label: 'Sensitivity is low', color: cLThemeColors.yellow },
    '3_2': { label: 'No species impact', color: cLThemeColors.yellow },
    '3_3': { label: 'Not a pollutant', color: cLThemeColors.yellow },
    '3_4': { label: 'Only a few degrees', color: cLThemeColors.yellow },
    '3_5': { label: 'No link to conflict', color: cLThemeColors.yellow },
    '3_6': { label: 'No health impacts', color: cLThemeColors.yellow },
    '4_1': { label: 'Policies are harmful', color: cLThemeColors.blue },
    '4_2': { label: 'Policies are ineffective', color: cLThemeColors.blue },
    '4_3': { label: 'Too hard', color: cLThemeColors.blue },
    '4_4': { label: "Clean energy won't work", color: cLThemeColors.blue },
    '4_5': { label: 'We need energy', color: cLThemeColors.blue },
    '5_1': { label: 'Science is unreliable', color: cLThemeColors.grey },
    '5_2': { label: 'Movement is unreliable', color: cLThemeColors.grey },
    '5_3': { label: 'Climate is conspiracy', color: cLThemeColors.grey }
  };

  const superClaims = {
    "1": {title: "Global warming is not happening" , color: cLThemeColors.red},
    "2": {title: "Human Greenhouse Gases are not causing global warming" , color: cLThemeColors.pink},
    "3": {title: "Climate impacts are not bad" , color: cLThemeColors.yellow},
    "4": {title: "Climate solutions won't work" , color: cLThemeColors.blue},
    "5": {title: "Climate movement/science is unreliable" , color: cLThemeColors.grey}
  }

//earliest and latest climate lie tweet date. copied from given csv file
const earliestTweetDate = "01-02-2007"; 
const latestTweetDate = "31-12-2022";

export {climateArguments, superClaims, earliestTweetDate, latestTweetDate} 