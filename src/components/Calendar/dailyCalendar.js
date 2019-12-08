import React from "react";
import { DailyCalendarContext } from "./calendarContext";
import "./dailyCalendar.scss";

import moment from "moment";

import { Button, Icon, Row, Col } from "antd";

const DailyCalendar = () => {
  return (
    <DailyCalendarContext.Consumer>
      {value => {
        return (
          <div className="calendar-daily-component">
            <Row className="calendar-daily-component__header">
              <Col span={7}>
                <Button
                  className="calendar-daily-component__header__prev-month-button"
                  onClick={value.onClickDailyPrevMonth(
                    value.date.currentYear,
                    value.date.currentMonth
                  )}
                >
                  <Icon type="left" />
                </Button>
              </Col>
              <Col span={10}>
                <h3 className="calendar-daily-component__header__month-string">
                  {`${value.date.currentMonthString} ${value.date.currentYear}`}
                </h3>
              </Col>
              <Col span={7}>
                <Button
                  className="calendar-daily-component__header__next-month-button"
                  onClick={value.onClickDailyNextMonth(
                    value.date.currentYear,
                    value.date.currentMonth
                  )}
                >
                  <Icon type="right" />
                </Button>
              </Col>
            </Row>

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
              {value.currentDailyCalendar.map(week => {
                return (
                  <Row type="flex" justify="center" gutter={[8, 8]}>
                    {week.map(day => {
                      return (
                        <Col span={3}>
                          <Button
                            className={
                              moment(day).format("DD-MMMM-YYYY") ===
                              value.selectedDate
                                ? "calendar-daily-component__body__dates__active"
                                : "calendar-daily-component__body__dates"
                            }
                            value={day}
                            onClick={value.onClickDailyDate}
                          >
                            {moment(day).format("DD-MM-YYYY") ===
                            value.today.fullDate ? (
                              <div>
                                <p className="calendar-daily-component__body__dates__today">
                                  {moment(day).format("DD")}
                                </p>
                                <p className="calendar-daily-component__body__dates__today__text">
                                  Hari Ini
                                </p>
                              </div>
                            ) : (
                              moment(day).format("DD")
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
