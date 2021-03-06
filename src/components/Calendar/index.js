import React, { useState } from "react";
import "./calendar.scss";
import moment from "moment";
import {
  DailyCalendarContext,
  WeeklyCalendarContext,
  MonthlyCalendarContext,
  YearlyCalendarContext,
} from "./calendarContext";
import DailyCalendar from "./dailyCalendar";
import WeeklyCalendar from "./weeklyCalendar";
import MonthlyCalendar from "./monthlyCalendar";

import { Card, Button, Input, Icon, Dropdown, Row, Col, List } from "antd";

const today = {
  fullDate: moment().format("DD-MM-YYYY"),
  currentMonth: moment().format("MM"),
  currentYear: moment().format("YYYY"),
};

const Calendar = (props) => {
  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("daily");

  const [selectedDateRange, setSelectedDateRange] = useState({
    date: moment(),
  });

  const handleVisibleChange = () => {
    if (selectedDateRange == null) {
      setSelectedDateRange({ date: moment() });
    }
    setVisible((prevState) => {
      return !prevState;
    });
  };

  const handleClickDaily = () => {
    setCalendarType("daily");
  };

  const handleClickWeekly = () => {
    setCalendarType("weekly");
  };

  const handleClickMonthly = () => {
    setCalendarType("monthly");
  };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return (
        <DailyCalendarContext.Provider
          value={{
            selectedDateRange,
            setSelectedDateRange,
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
            setSelectedDateRange,
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
            setSelectedDateRange,
          }}
        >
          <MonthlyCalendar />
        </MonthlyCalendarContext.Provider>
      );
    }
  };

  const menu = (
    <Card className="calendar-menu">
      <Row
        gutter={8}
        className="calendar-menu__row"
        type="flex"
        justify="space-around"
      >
        <Col>
          <Button
            className={
              calendarType === "daily"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickDaily}
          >
            Daily
          </Button>
        </Col>
        <Col>
          <Button
            className={
              calendarType === "weekly"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickWeekly}
          >
            Weekly
          </Button>
        </Col>
        <Col>
          <Button
            className={
              calendarType === "monthly"
                ? "calendar-menu__button__active"
                : "calendar-menu__button"
            }
            onClick={handleClickMonthly}
          >
            Monthly
          </Button>
        </Col>
      </Row>
      {renderCalendar()}
    </Card>
  );

  let displayedDateRange = "";
  if (
    selectedDateRange != null &&
    selectedDateRange.from != selectedDateRange.to
  ) {
    displayedDateRange =
      moment(selectedDateRange.from).format("DD-MM-YYYY") +
      " - " +
      moment(selectedDateRange.to).format("DD-MM-YYYY");
  } else if (
    selectedDateRange != null &&
    selectedDateRange.hasOwnProperty("date")
  ) {
    displayedDateRange = moment(selectedDateRange.date).format("DD-MM-YYYY");
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
            onClick={props.onClick(selectedDateRange)}
            value={displayedDateRange}
          ></Input>
        </Dropdown>
      </div>
    </div>
  );
};

export default Calendar;
