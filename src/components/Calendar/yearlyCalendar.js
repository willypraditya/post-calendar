import React from "react";
import moment from "moment";
import { YearlyCalendarContext } from "./calendarContext";

import { Button } from "antd";
import { PickerView } from "antd-mobile";

const YearlyCalendar = () => {
  const years = () => {
    const years = [];
    const dateStart = moment().subtract(3, "y");
    const dateEnd = moment().subtract(1, "y");
    while (dateEnd.diff(dateStart, "years") >= 0) {
      years.push(dateStart.format("YYYY"));
      dateStart.add(1, "year");
    }
    return years;
  };

  const season = [
    {
      label: "春",
      value: "春"
    },
    {
      label: "夏",
      value: "夏"
    }
  ];

  const renderYears = () => {
    years().map(item => {
      console.log(item);
      // return (
      //   <div>
      //     <PickerView data={season} cascade={false} />
      //     {/* <Button>{item}</Button> */}
      //   </div>
      // );
    });
  };

  return (
    <YearlyCalendarContext.Consumer>
      {value => (
        <div className="yearly-calendar-component">{renderYears()}</div>
      )}
    </YearlyCalendarContext.Consumer>
  );
};

export default YearlyCalendar;
