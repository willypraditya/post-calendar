import React, { useState } from "react";
import "./calendar.scss";
import moment from "moment";
import {
  DailyCalendarContext,
  WeeklyCalendarContext,
  MonthlyCalendarContext,
  YearlyCalendarContext
} from "./calendarContext";
import DailyCalendar from "./dailyCalendar";
import WeeklyCalendar from "./weeklyCalendar";
import MonthlyCalendar from "./monthlyCalendar";
import YearlyCalendar from "./yearlyCalendar";

import { Card, Button, Input, Icon, Dropdown, Row, Col, List } from "antd";

const today = {
  fullDate: moment().format("DD-MM-YYYY"),
  currentMonth: moment().format("MM"),
  currentYear: moment().format("YYYY")
};

const Calendar = () => {
  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("daily");

  const [date, setDate] = useState(today);

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: moment(),
    to: moment()
  });

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const handleClickDaily = () => {
    setDate(today);
    // setSelectedDateRange({
    //   from: moment(),
    //   to: moment()
    // });
    setCalendarType("daily");
  };

  const handleClickWeekly = () => {
    setDate(today);
    // setSelectedDateRange({
    //   from: moment(),
    //   to: moment()
    // });
    setCalendarType("weekly");
  };

  const handleClickMonthly = () => {
    setDate(today);
    // setSelectedDateRange({
    //   from: moment(),
    //   to: moment()
    // });
    setCalendarType("monthly");
  };

  const handleClickYearly = () => {
    setDate(today);
    setCalendarType("yearly");
  };

  // const onClickMonthlyDate = dateRange => {
  //   setSelectedDateRange(dateRange);
  // };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return (
        <DailyCalendarContext.Provider
          value={{
            selectedDateRange,
            setSelectedDateRange
          }}
        >
          <DailyCalendar />
        </DailyCalendarContext.Provider>
      );
    } else if (calendarType === "weekly") {
      return (
        <WeeklyCalendarContext.Provider
          value={{
            selectedDateRange,
            setSelectedDateRange
          }}
        >
          <WeeklyCalendar />
        </WeeklyCalendarContext.Provider>
      );
    } else if (calendarType === "monthly") {
      return (
        <MonthlyCalendarContext.Provider
          value={{
            selectedDateRange,
            setSelectedDateRange
          }}
        >
          <MonthlyCalendar />
        </MonthlyCalendarContext.Provider>
      );
    }
    // else if (calendarType === "yearly") {
    //   return (
    //     <YearlyCalendarContext.Provider value={{}}>
    //       <YearlyCalendar />
    //     </YearlyCalendarContext.Provider>
    //   );
    // }
  };

  const menu = (
    <Card className="calendar-menu">
      <Row
        gutter={8}
        className="calendar-menu__row"
        type="flex"
        justify="center"
      >
        <Col span={6}>
          <Button
            className={
              calendarType === "daily"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickDaily}
          >
            Harian
          </Button>
        </Col>
        <Col span={6}>
          <Button
            className={
              calendarType === "weekly"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickWeekly}
          >
            Mingguan
          </Button>
        </Col>
        <Col span={6}>
          <Button
            className={
              calendarType === "monthly"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickMonthly}
          >
            Bulanan
          </Button>
        </Col>
        <Col span={6}>
          <Button
            className={
              calendarType === "yearly"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickYearly}
          >
            Tahunan
          </Button>
        </Col>
      </Row>
      {renderCalendar()}
    </Card>
  );

  let displayedDateRange = "";
  if (selectedDateRange != null) {
    displayedDateRange =
      moment(selectedDateRange.from).format("DD-MM-YYYY") +
      " - " +
      moment(selectedDateRange.to).format("DD-MM-YYYY");
  }
  return (
    <div style={{ margin: "20px" }}>
      <div>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Input
            className="calendar"
            prefix={<Icon type="calendar" />}
            suffix={<Icon type="caret-down" />}
            placeholder="Calendar"
            value={displayedDateRange}
          ></Input>
        </Dropdown>
      </div>
    </div>
  );
};

export default Calendar;
