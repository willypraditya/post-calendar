import React from "react";
import moment from "moment";
import { YearlyCalendarContext } from "./calendarContext";

const YearlyCalendar = () => {
  const years = () => {
    const years = [];
    const dateStart = moment().subtract(3, "y");
    const dateEnd = moment().add(3, "y");
    while (dateEnd.diff(dateStart, "years") >= 0) {
      years.push(dateStart.format("YYYY"));
      dateStart.add(1, "year");
    }
    return years;
  };
  return (
    <YearlyCalendarContext.Consumer>
      {value => {
        years().map(item => {
          console.log(item);
        });
      }}
    </YearlyCalendarContext.Consumer>
  );
};

export default YearlyCalendar;
