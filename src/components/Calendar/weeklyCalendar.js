import React, { useState } from "react";
import { WeeklyCalendarContext } from "./calendarContext";
import "./weeklyCalendar.scss";
import MonthHeaderSelector from "./monthHeaderSelector";

import moment from "moment";

import { Button, Icon, Row, Col, List } from "antd";
import { getWeekRangeList } from "./utils";

const WeeklyCalendar = () => {
  const reloadCalendar = x => {
    let calendar = getWeekRangeList(x.year, x.month);
    setMonthAndYear(x);
    setWeeklyCalendar(calendar);
  };

  const [monthAndYear, setMonthAndYear] = useState({
    year: moment().year(),
    month: moment().month() + 1
  });

  const [weeklyCalendar, setWeeklyCalendar] = useState(
    getWeekRangeList(monthAndYear.year, monthAndYear.month)
  );
  return (
    <WeeklyCalendarContext.Consumer>
      {value => {
        return (
          <div className="calendar-weekly-component">
            <MonthHeaderSelector
              monthAndYear={monthAndYear}
              onChange={x => reloadCalendar(x)}
            />
            <div className="calendar-weekly-component__body">
              <List>
                {weeklyCalendar.map((item, index) => {
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
