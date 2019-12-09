import React from "react";
import moment from "moment";
import { MonthlyCalendarContext } from "./calendarContext";
import "./monthlyCalendar.scss";

import { Button, Icon, Row, Col } from "antd";

const MonthlyCalendar = () => {
  const chunckMonth = () => {
    let months = [];

    for (let index = 0; index < 11; index += 3) {
      months.push([index + 1, index + 2, index + 3]);
    }

    return months;
  };

  const getMonthRange = (year, month) => {
    console.log(year, month);
    let from = new Date(year, month - 1, 1);
    let to = new Date(year, month, 0);
    return {
      from,
      to
    };
  };

  return (
    <MonthlyCalendarContext.Consumer>
      {value => {
        return (
          <div className="calendar-monthly-component">
            <Row className="calendar-monthly-component__header">
              <Col span={7}>
                <Button
                  className="calendar-monthly-component__header__prev-year-button"
                  onClick={value.onClickMonthlyPrevYear(value.date.currentYear)}
                >
                  <Icon type="left" />
                </Button>
              </Col>
              <Col span={10}>
                <h3 className="calendar-monthly-component__year-string">
                  {value.date.currentYear}
                </h3>
              </Col>
              <Col span={7}>
                <Button
                  className="calendar-monthly-component__header__next-year-button"
                  onClick={value.onClickMonthlyNextYear(value.date.currentYear)}
                >
                  <Icon type="right" />
                </Button>
              </Col>
            </Row>

            <div className="calendar-monthly-component__body">
              {chunckMonth().map(chunkedMonths => {
                return (
                  <Row type="flex" justify="center" gutter={[1, 16]}>
                    {chunkedMonths.map(month => {
                      let monthRange = getMonthRange(
                        value.date.currentYear,
                        month
                      );
                      const { from, to } = monthRange;

                      return (
                        <Col span={7}>
                          <Button
                            className={
                              value.selectedDate ==
                              `${moment(from).format("DD/MM/YYYY")} - ${moment(
                                to
                              ).format("DD/MM/YYYY")}`
                                ? "calendar-monthly-component__body__month-button__active"
                                : "calendar-monthly-component__body__month-button"
                            }
                            onClick={() => value.onClickMonthlyDate(monthRange)}
                          >
                            {value.today.currentMonth == month &&
                            value.today.currentYear ==
                              value.date.currentYear ? (
                              <div>
                                <p className="calendar-monthly-component__body__month-button__this-month">
                                  {moment()
                                    .months(month - 1)
                                    .format("MMMM")}
                                </p>
                                <p className="calendar-monthly-component__body__month-button__this-month__text">
                                  Bulan Ini
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
