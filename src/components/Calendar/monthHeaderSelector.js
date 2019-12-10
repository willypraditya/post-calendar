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
    props.onChange({
      month: m,
      year: y
    });
  };

  const onClickPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    props.onChange({
      month: m,
      year: y
    });
  };

  console.log(props.monthAndYear.month);

  return (
    <div className="month-header-component">
      <Row className="month-header-component__header">
        <Col span={7}>
          <Button
            className="month-header-component__header__prev-month-button"
            onClick={onClickPrevMonth(
              props.monthAndYear.year,
              props.monthAndYear.month
            )}
          >
            <Icon type="left" />
          </Button>
        </Col>
        <Col span={10}>
          <h3 className="month-header-component__header__month-string">
            {`${moment()
              .months(props.monthAndYear.month)
              .subtract(1, "month")
              .format("MMMM")} ${props.monthAndYear.year}`}
          </h3>
        </Col>
        <Col span={7}>
          <Button
            className="month-header-component__header__next-month-button"
            onClick={onClickNextMonth(
              props.monthAndYear.year,
              props.monthAndYear.month
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
