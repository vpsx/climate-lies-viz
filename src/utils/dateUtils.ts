import moment from "moment";
import { earliestTweetDate } from "../constants/tweetsMetadata";
import { format } from "date-fns";

const dateFormat = "DD-MM-YYYY";

function calculateDateRange(startDateStr: string, endDateStr: string) {
  let startDate = moment(startDateStr, "DD-MM-YYYY");
  let endDate = moment(endDateStr, "DD-MM-YYYY");
  return endDate.diff(startDate, "days");
}

function getPreviousDate(dateStr: string) {
  const newDate = moment(dateStr, dateFormat).subtract(1, "days");
  return moment(newDate).format(dateFormat);
}

function convertSliderValueToDate(value: number) {
  const newDate = moment(earliestTweetDate, dateFormat).add(value, "days");
  return moment(newDate).format(dateFormat);
}

const getDisplayDate = (dateStr: string) => {
  const newDate = moment(dateStr, dateFormat).toDate();
  return format(newDate, "LLLL, yyyy");
};

export {
  convertSliderValueToDate,
  getPreviousDate,
  getDisplayDate,
  calculateDateRange,
};
