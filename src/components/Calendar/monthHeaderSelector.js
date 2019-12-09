import React from "react";
import { Row, Col, Icon, Button } from "antd";
import moment from "moment";

import "./monthHeaderSelector.scss";

const MonthHeaderSelector = props => {
  const onClickNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    props.setDate({
      currentMonth: m,
      currentYear: y
    });

    props.setCurrentDailyCalendar(props.getCalendarDates(y, m));

    // {
    //   props.calendarType == "daily"
    //     ? props.setCurrentDailyCalendar(props.getCalendarDates(y, m))
    //     : props.setCurrentWeeklyCalendar(props.getWeekRangeList(y, m));
    // }
  };

  const onClickPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    props.setDate({
      currentMonth: m,
      currentYear: y
    });
    props.setCurrentDailyCalendar(props.getCalendarDates(y, m));
  };

  console.log(props.calendarType);

  return (
    <div className="month-header-component">
      <Row className="month-header-component__header">
        <Col span={7}>
          <Button
            className="month-header-component__header__prev-month-button"
            onClick={onClickPrevMonth(
              props.date.currentYear,
              props.date.currentMonth
            )}
          >
            <Icon type="left" />
          </Button>
        </Col>
        <Col span={10}>
          <h3 className="month-header-component__header__month-string">
            {`${moment()
              .months(props.date.currentMonth - 1)
              .format("MMMM")} ${props.date.currentYear}`}
          </h3>
        </Col>
        <Col span={7}>
          <Button
            className="month-header-component__header__next-month-button"
            onClick={onClickNextMonth(
              props.date.currentYear,
              props.date.currentMonth
            )}
          >
            <Icon type="right" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MonthHeaderSelector;
