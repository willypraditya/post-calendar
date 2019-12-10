import React, { useState } from "react";
import MonthHeaderSelector from "./monthHeaderSelector";
import { DailyCalendarContext } from "./calendarContext";
import "./dailyCalendar.scss";

import moment from "moment";

import { Button, Row, Col } from "antd";

import { getCalendarDates } from "./utils";

const DailyCalendar = () => {
  const [hoveredDateRange, setHoveredDateRange] = useState(null);

  const [datePick, setDatePick] = useState(moment().format("DD-MMMM-YYYY"));

  const [monthAndYear, setMonthAndYear] = useState({
    year: moment().year(),
    month: moment().month() + 1
  });

  const [clickCount, setClickCount] = useState(0);

  const [currentDailyCalendar, setCurrentDailyCalendar] = useState(
    getCalendarDates(monthAndYear.year, monthAndYear.month)
  );

  const reloadCalendar = x => {
    let calendar = getCalendarDates(x.year, x.month);
    setMonthAndYear(x);
    setCurrentDailyCalendar(calendar);
  };

  const handleDateMouseOver = (i, j) => {
    let day = currentDailyCalendar[i][j];
    if (datePick != null) {
      onHoveredDailyCalendar(datePick, day);
    }
  };

  const onHoveredDailyCalendar = (from, to) => {
    if (from > to) {
      [from, to] = [to, from];
    }

    setHoveredDateRange({
      from,
      to
    });
  };

  const resolveDateStyle = (day, value) => {
    if (value.selectedDateRange != null) {
      const formattedDay = moment(day).format("YYYY-MM-DD");
      const formattedDateFrom = moment(value.selectedDateRange.from).format(
        "YYYY-MM-DD"
      );
      const formattedDateTo = moment(value.selectedDateRange.to).format(
        "YYYY-MM-DD"
      );

      if (moment(formattedDay).isSame(formattedDateFrom)) {
        return "calendar-daily-component__body__dates__active";
      }

      if (moment(formattedDay).isBetween(formattedDateFrom, formattedDateTo)) {
        return "calendar-daily-component__body__dates__range";
      }
    }

    if (
      value.selectedDateRange != null &&
      value.selectedDateRange.to >= day &&
      value.selectedDateRange.from <= day
    ) {
      return "calendar-daily-component__body__dates__active";
    }

    if (
      hoveredDateRange != null &&
      hoveredDateRange.to > day &&
      hoveredDateRange.from < day
    ) {
      return "calendar-daily-component__body__dates__range";
    }

    return "calendar-daily-component__body__dates";
  };

  return (
    <DailyCalendarContext.Consumer>
      {value => {
        const onRangeSelectedFromDailyCalendar = (from, to) => {
          if (from > to) {
            [from, to] = [to, from];
          }

          value.setSelectedDateRange({
            from,
            to
          });
        };

        const handleDateClick = (i, j) => {
          let day = currentDailyCalendar[i][j];

          if (clickCount % 2 === 0) {
            setDatePick(day);
            value.setSelectedDateRange(null);
            setHoveredDateRange(null);
          } else {
            if (datePick != null) {
              onRangeSelectedFromDailyCalendar(datePick, day);
              setDatePick(null);
            }
          }
          setClickCount(prevState => prevState + 1);
        };

        return (
          <div className="calendar-daily-component">
            <MonthHeaderSelector
              monthAndYear={monthAndYear}
              onChange={x => reloadCalendar(x)}
            />
            <div className="calendar-daily-component__body">
              <Row
                className="calendar-daily-component__body__days-header"
                type="flex"
                justify="center"
              >
                <Col span={3}>SU</Col>
                <Col span={3}>MO</Col>
                <Col span={3}>TU</Col>
                <Col span={3}>WE</Col>
                <Col span={3}>TH</Col>
                <Col span={3}>Fr</Col>
                <Col span={3}>SA</Col>
              </Row>
              {currentDailyCalendar.map((week, i) => {
                return (
                  <Row type="flex" justify="center" gutter={[8, 8]}>
                    {week.map((day, j) => {
                      return (
                        <Col span={3}>
                          <Button
                            className={resolveDateStyle(day, value)}
                            value={day}
                            onClick={() => handleDateClick(i, j)}
                            onMouseOver={() => handleDateMouseOver(i, j)}
                          >
                            {moment(day).isSame(moment(), "day") ? (
                              <div>
                                <p className="calendar-daily-component__body__dates__today">
                                  {moment(day).format("D")}
                                </p>
                                <p className="calendar-daily-component__body__dates__today__text">
                                  Hari Ini
                                </p>
                              </div>
                            ) : (
                              moment(day).format("D")
                            )}
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </div>
          </div>
        );
      }}
    </DailyCalendarContext.Consumer>
  );
};

export default DailyCalendar;
