import React, { useState } from "react";
import MonthHeaderSelector from "./monthHeaderSelector";
import { DailyCalendarContext } from "./calendarContext";
import "./dailyCalendar.scss";

import moment from "moment";

import { Button, Icon, Row, Col } from "antd";

const resolveDateStyle = (day, value) => {
  if (
    value.selectedDateRange != null &&
    value.selectedDateRange.to >= day &&
    value.selectedDateRange.from <= day
  ) {
    return "calendar-daily-component__body__dates__active";
  }

  if (
    value.hoveredDateRange != null &&
    value.hoveredDateRange.to >= day &&
    value.hoveredDateRange.from <= day
  ) {
    return "calendar-daily-component__body__dates__active";
  }

  return "calendar-daily-component__body__dates";
};
const DailyCalendar = () => {
  return (
    <DailyCalendarContext.Consumer>
      {value => {
        return (
          <div className="calendar-daily-component">
            <MonthHeaderSelector />
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
              {value.currentDailyCalendar.map((week, i) => {
                return (
                  <Row type="flex" justify="center" gutter={[8, 8]}>
                    {week.map((day, j) => {
                      return (
                        <Col span={3}>
                          <Button
                            className={resolveDateStyle(day, value)}
                            value={day}
                            onClick={() => value.handleDateClick(i, j)}
                            onMouseOver={() => value.handleDateMouseOver(i, j)}
                          >
                            {moment(day).format("DD-MM-YYYY") ===
                            value.today.fullDate ? (
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
