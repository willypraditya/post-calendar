import React from "react";
import { WeeklyCalendarContext } from "./calendarContext";
import "./weeklyCalendar.scss";

import moment from "moment";

import { Button, Icon, Row, Col, List } from "antd";

const WeeklyCalendar = () => {
  return (
    <WeeklyCalendarContext.Consumer>
      {value => {
        return (
          <div className="calendar-weekly-component">
            <Row className="calendar-weekly-component__header">
              <Col span={7}>
                <Button
                  className="calendar-weekly-component__header__prev-month-button"
                  onClick={value.onClickWeeklyPrevMonth(
                    value.date.currentYear,
                    value.date.currentMonth
                  )}
                >
                  <Icon type="left" />
                </Button>
              </Col>
              <Col span={10}>
                <h3 className="calendar-weekly-component__month-string">
                  {`${moment()
                    .months(value.date.currentMonth - 1)
                    .format("MMMM")} ${value.date.currentYear}`}
                </h3>
              </Col>
              <Col span={7}>
                <Button
                  className="calendar-weekly-component__header__next-month-button"
                  onClick={value.onClickWeeklyNextMonth(
                    value.date.currentYear,
                    value.date.currentMonth
                  )}
                >
                  <Icon type="right" />
                </Button>
              </Col>
            </Row>
            <div className="calendar-weekly-component__body">
              <List>
                {value.currentWeeklyCalendar.map((item, index) => {
                  return (
                    <List.Item>
                      <Button
                        className="calendar-weekly-component__body__list-button"
                        className={
                          `${moment(item.from).format("DD/MM/YYYY")} - ${moment(
                            item.to
                          ).format("DD/MM/YYYY")}` === value.selectedDate
                            ? "calendar-weekly-component__body__list-button__active"
                            : "calendar-weekly-component__body__list-button"
                        }
                        onClick={() => value.onClickWeeklyDate(item)}
                      >
                        <Row className="calendar-weekly-component__body__list-row">
                          <Col span={6}>
                            {moment().isBetween(
                              moment(item.from),
                              moment(item.to),
                              null,
                              "[]"
                            ) ? (
                              <div className="calendar-weekly-component__body__this-week">
                                <p className="calendar-weekly-component__body__this-week__week-count">
                                  Minggu ke-{index + 1}
                                </p>
                                <p className="calendar-weekly-component__body__this-week__week-count__text">
                                  Minggu Ini
                                </p>
                              </div>
                            ) : (
                              <p className="calendar-weekly-component__body__this-week__week-count">
                                Minggu ke-{index + 1}
                              </p>
                            )}
                          </Col>
                          <Col span={4} offset={8}>
                            <p className="calendar-weekly-component__body__week-dates">
                              {`${moment(item.from).format(
                                "DD/MM/YYYY"
                              )} - ${moment(item.to).format("DD/MM/YYYY")}`}
                            </p>
                          </Col>
                        </Row>
                      </Button>
                    </List.Item>
                  );
                })}
              </List>
            </div>
          </div>
        );
      }}
    </WeeklyCalendarContext.Consumer>
  );
};

export default WeeklyCalendar;
