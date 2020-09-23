import React, { useState } from "react";
import moment from "moment";
import { MonthlyCalendarContext } from "./calendarContext";
import "./monthlyCalendar.scss";

import { Button, Icon, Row, Col } from "antd";

const MonthlyCalendar = () => {
  const [monthAndYear, setMonthAndYear] = useState({
    year: moment().year(),
    month: moment().month() + 1,
  });

  const chunckMonth = () => {
    let months = [];

    for (let index = 0; index < 11; index += 3) {
      months.push([index + 1, index + 2, index + 3]);
    }

    return months;
  };

  const getMonthRange = (year, month) => {
    let from = new Date(year, month - 1, 1);
    let to = new Date(year, month, 0);
    return {
      from,
      to,
    };
  };

  const onClickMonthlyPrevYear = (year) => () => {
    setMonthAndYear((prevState) => ({
      ...prevState,
      year: parseInt(year) - 1,
    }));
  };

  const onClickMonthlyNextYear = (year) => () => {
    setMonthAndYear((prevState) => ({
      ...prevState,
      year: parseInt(year) + 1,
    }));
  };

  return (
    <MonthlyCalendarContext.Consumer>
      {(value) => {
        const onClickMonthlyDate = (dateRange) => {
          value.setSelectedDateRange(dateRange);
        };
        return (
          <div className="calendar-monthly-component">
            <Row className="calendar-monthly-component__header">
              <Col span={7}>
                <Button
                  className="calendar-monthly-component__header__prev-year-button"
                  onClick={onClickMonthlyPrevYear(
                    monthAndYear.year,
                    monthAndYear.month
                  )}
                >
                  <Icon type="left" />
                </Button>
              </Col>
              <Col span={10}>
                <h3 className="calendar-monthly-component__year-string">
                  {monthAndYear.year}
                </h3>
              </Col>
              <Col span={7}>
                <Button
                  className="calendar-monthly-component__header__next-year-button"
                  onClick={onClickMonthlyNextYear(
                    monthAndYear.year,
                    monthAndYear.month
                  )}
                >
                  <Icon type="right" />
                </Button>
              </Col>
            </Row>

            <div className="calendar-monthly-component__body">
              {chunckMonth().map((chunkedMonths) => {
                return (
                  <Row type="flex" justify="center" gutter={[1, 16]}>
                    {chunkedMonths.map((month) => {
                      let monthRange = getMonthRange(monthAndYear.year, month);
                      const { from, to } = monthRange;

                      return (
                        <Col span={7}>
                          <Button
                            className={
                              moment(from).isSame(
                                value.selectedDateRange.from,
                                "day"
                              ) &&
                              moment(to).isSame(
                                value.selectedDateRange.to,
                                "day"
                              )
                                ? "calendar-monthly-component__body__month-button__active"
                                : "calendar-monthly-component__body__month-button"
                            }
                            onClick={() => onClickMonthlyDate(monthRange)}
                          >
                            {monthAndYear.month == month &&
                            monthAndYear.year == moment().year() ? (
                              <div>
                                <p className="calendar-monthly-component__body__month-button__this-month">
                                  {moment()
                                    .months(month - 1)
                                    .format("MMMM")}
                                </p>
                                <p className="calendar-monthly-component__body__month-button__this-month__text">
                                  Current Month
                                </p>
                              </div>
                            ) : (
                              <p className="calendar-monthly-component__body__month-button__this-month">
                                {moment()
                                  .months(month - 1)
                                  .format("MMMM")}
                              </p>
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
    </MonthlyCalendarContext.Consumer>
  );
};

export default MonthlyCalendar;
