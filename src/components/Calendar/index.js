import React, { useState } from "react";
import "./calendar.scss";
import moment from "moment";
import {
  DailyCalendarContext,
  WeeklyCalendarContext,
  MonthlyCalendarContext
} from "./calendarContext";
import DailyCalendar from "./dailyCalendar";
import WeeklyCalendar from "./weeklyCalendar";
import MonthlyCalendar from "./monthlyCalendar";

import { Card, Button, Input, Icon, Dropdown, Row, Col, List } from "antd";

const getCalendarDates = (year, month) => {
  let arr = [];

  let d = new Date(year, month - 1, 1);
  let offset = d.getDay() - 1;

  for (var i = 1; i <= 42; i++) {
    let d = new Date(year, month - 1, i);
    let day = d.getDay();
    arr[offset + i] = d;
  }
  for (var i = -offset; i <= offset; i++) {
    let d = new Date(year, month - 1, i);
    let day = d.getDay();
    arr[offset + i] = d;
  }

  arr.slice(0, 42);

  let twoDimensionalArray = [];
  for (i = 0; i < 5; i++) {
    let clonedArray = [...arr].splice(i * 7, 7);
    twoDimensionalArray[i] = clonedArray;
  }
  return twoDimensionalArray;
};

const getWeekRangeList = (year, month) => {
  let x = getCalendarDates(year, month);
  return x.map(weekList => ({
    from: weekList[0],
    to: weekList[6]
  }));
};

const today = {
  fullDate: moment().format("DD-MM-YYYY"),
  currentMonth: moment().format("MM"),
  currentMonthString: moment().format("MMMM"),
  currentYear: moment().format("YYYY")
};

const Calendar = () => {
  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("daily");

  const [date, setDate] = useState(today);

  const [currentDailyCalendar, setCurrentDailyCalendar] = useState(
    getCalendarDates(today.currentYear, today.currentMonth)
  );

  const [currentWeeklyCalendar, setCurrentWeeklyCalendar] = useState(
    getWeekRangeList(today.currentYear, today.currentMonth)
  );

  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MMMM-YYYY")
  );

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const handleClickDaily = () => {
    setDate(today);
    setCurrentDailyCalendar(
      getCalendarDates(today.currentYear, today.currentMonth)
    );
    setCalendarType("daily");
  };

  const handleClickWeekly = () => {
    setDate(today);
    setCurrentWeeklyCalendar(
      getWeekRangeList(today.currentYear, today.currentMonth)
    );
    setCalendarType("weekly");
  };

  const handleClickMonthly = () => {
    setDate(today);
    setCalendarType("monthly");
  };

  const onClickDailyDate = e => {
    setSelectedDate(moment(e.target.value).format("DD-MMMM-YYYY"));
  };

  const onClickWeeklyDate = e => {
    setSelectedDate(
      `${moment(JSON.parse(e.currentTarget.value).from).format(
        "DD/MM/YYYY"
      )} - ${moment(JSON.parse(e.currentTarget.value).to).format("DD/MM/YYYY")}`
    );
  };

  const onClickMonthlyDate = e => {
    setSelectedDate(
      `${moment(JSON.parse(e.currentTarget.value).from).format(
        "DD/MM/YYYY"
      )} - ${moment(JSON.parse(e.currentTarget.value).to).format("DD/MM/YYYY")}`
    );
  };

  const onClickDailyNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentDailyCalendar(getCalendarDates(y, m));
  };

  const onClickDailyPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentDailyCalendar(getCalendarDates(y, m));
  };

  const onClickWeeklyNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentWeeklyCalendar(getWeekRangeList(y, m));
  };

  const onClickWeeklyPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentWeeklyCalendar(getWeekRangeList(y, m));
  };

  const onClickMonthlyPrevYear = year => () => {
    setDate({
      currentYear: parseInt(year) - 1
    });
  };

  const onClickMonthlyNextYear = year => () => {
    setDate({
      currentYear: parseInt(year) + 1
    });
  };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return (
        <DailyCalendarContext.Provider
          value={{
            today,
            date,
            selectedDate,
            currentDailyCalendar,
            onClickDailyDate,
            onClickDailyPrevMonth,
            onClickDailyNextMonth
          }}
        >
          <DailyCalendar />
        </DailyCalendarContext.Provider>
      );
    } else if (calendarType === "weekly") {
      return (
        <WeeklyCalendarContext.Provider
          value={{
            today,
            date,
            selectedDate,
            currentWeeklyCalendar,
            onClickWeeklyDate,
            onClickWeeklyPrevMonth,
            onClickWeeklyNextMonth
          }}
        >
          <WeeklyCalendar />
        </WeeklyCalendarContext.Provider>
      );
    } else if (calendarType === "monthly") {
      return (
        <MonthlyCalendarContext.Provider
          value={{
            today,
            date,
            selectedDate,
            onClickMonthlyDate,
            onClickMonthlyPrevYear,
            onClickMonthlyNextYear
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
        {/* <Col span={6}>
          <Button className="calendar-menu-button">Tahunan</Button>
        </Col> */}
      </Row>
      {renderCalendar()}
    </Card>
  );

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
            value={selectedDate}
          ></Input>
        </Dropdown>
      </div>
    </div>
  );
};

export default Calendar;
