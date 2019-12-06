import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./welcome.scss";
import Calendar from "../Calendar";
import moment from "moment";

import {
  Card,
  Button,
  Input,
  Icon,
  Dropdown,
  Menu,
  Row,
  Col,
  List
} from "antd";

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

const Welcome = () => {
  const [currentDate, setCurrentDate] = useState(moment().format("DD"));
  const [currentMonth, setCurrentMonth] = useState(moment().format("MM"));
  const [currentMonthString, setCurrentMonthString] = useState(
    moment(currentMonth).format("MMMM")
  );
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));

  const [currentCalendar, setCurrentCalendar] = useState(
    getCalendarDates(currentYear, currentMonth)
  );

  const [currentWeekCalendar, setCurrentWeekCalendar] = useState(
    getWeekRangeList(currentYear, currentMonth)
  );

  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MMMM-YYYY")
  );

  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("daily");

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const handleClickDaily = () => {
    setCalendarType("daily");
  };

  const handleClickWeekly = () => {
    setCalendarType("weekly");
  };

  const onClickDate = date => {
    setSelectedDate(moment(date.target.value).format("DD-MMMM-YYYY"));
  };

  const onClickNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    setCurrentMonth(m);
    setCurrentMonthString(moment(m.toString()).format("MMMM"));
    setCurrentYear(y);
    setCurrentCalendar(getCalendarDates(y, m));
  };

  const onClickPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    setCurrentMonth(m);
    setCurrentMonthString(moment(m.toString()).format("MMMM"));
    setCurrentYear(y);
    setCurrentCalendar(getCalendarDates(y, m));
  };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return (
        <div className="calendar-daily-component">
          <Row className="calendar-daily-component__header">
            <Col span={7}>
              <Button
                className="calendar-daily-component__header__prev-month-button"
                onClick={onClickPrevMonth(currentYear, currentMonth)}
              >
                <Icon type="left" />
              </Button>
            </Col>
            <Col span={10}>
              <h3 className="calendar-daily-component__header__month-string">
                {`${currentMonthString} ${currentYear}`}
              </h3>
            </Col>
            <Col span={7}>
              <Button
                className="calendar-daily-component__header__next-month-button"
                onClick={onClickNextMonth(currentYear, currentMonth)}
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
            {currentCalendar.map(week => {
              return (
                <Row type="flex" justify="center">
                  {week.map(day => {
                    return (
                      <Col span={3}>
                        <Button
                          className={
                            moment(day).format("DD-MMMM-YYYY") === selectedDate
                              ? "calendar-daily-component__body__dates__active"
                              : "calendar-daily-component__body__dates"
                          }
                          value={moment(day).format("DD-MMMM-YYYY")}
                          onClick={onClickDate}
                        >
                          {moment(day).format("DD")}
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
    } else if (calendarType === "weekly") {
      return (
        <div className="calendar-weekly-component">
          <Row className="calendar-weekly-component__header">
            <Col span={7}>
              <Button
                className="calendar-weekly-component__header__prev-month-button"
                onClick={onClickPrevMonth(currentYear, currentMonth)}
              >
                <Icon type="left" />
              </Button>
            </Col>
            <Col span={10}>
              <h3 className="calendar-weekly-component__month-string">
                {`${currentMonthString} ${currentYear}`}
              </h3>
            </Col>
            <Col span={7}>
              <Button
                className="calendar-weekly-component__header__next-month-button"
                onClick={onClickNextMonth(currentYear, currentMonth)}
              >
                <Icon type="right" />
              </Button>
            </Col>
          </Row>
          {console.log(getWeekRangeList(2019, 12))}
          <div className="calendar-weekly-component__body">
            <List>
              {currentWeekCalendar.map((item, index) => {
                console.log(item);
                return (
                  <List.Item>
                    <Row>
                      <Col span={8}>Minggu ke-{index + 1}</Col>
                      <Col span={16}>{`${moment(item.from).format(
                        "DD/MM/YYYY"
                      )} - ${moment(item.to).format("DD/MM/YYYY")}`}</Col>
                    </Row>
                  </List.Item>
                );
              })}
            </List>
          </div>
        </div>
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
        {/* <Col span={6}>
          <Button className="calendar-menu-button">Bulanan</Button>
        </Col>
        <Col span={6}>
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
        {/* <Calendar></Calendar> */}
      </div>
    </div>
  );
};

export default Welcome;
