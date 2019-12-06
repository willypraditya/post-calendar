import React, { useState } from "react";
import "./calendar.scss";
import moment from "moment";

import { Card, Button, Input, Icon, Dropdown, Row, Col, List } from "antd";

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

const today = {
  fullDate: moment().format("DD MMMM YYYY"),
  currentMonth: moment().format("MM"),
  currentMonthString: moment().format("MMMM"),
  currentYear: moment().format("YYYY")
};

const Calendar = () => {
  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("daily");

  const [date, setDate] = useState(today);

  const [currentDailyCalendar, setCurrentDailyCalendar] = useState(
    getCalendarDates(today.currentYear, today.currentMonth)
  );

  const [currentWeeklyCalendar, setCurrentWeeklyCalendar] = useState(
    getWeekRangeList(today.currentYear, today.currentMonth)
  );

  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MMMM-YYYY")
  );

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const handleClickDaily = () => {
    setDate(today);
    setCurrentDailyCalendar(
      getCalendarDates(today.currentYear, today.currentMonth)
    );
    setCalendarType("daily");
  };

  const handleClickWeekly = () => {
    setDate(today);
    setCurrentWeeklyCalendar(
      getWeekRangeList(today.currentYear, today.currentMonth)
    );
    setCalendarType("weekly");
  };

  const onClickDailyDate = date => {
    setSelectedDate(moment(date.target.value).format("DD-MMMM-YYYY"));
  };

  const onClickWeeklyDate = date => {
    setSelectedDate(
      `${moment(JSON.parse(date.currentTarget.value).from).format(
        "DD/MM/YYYY"
      )} - ${moment(JSON.parse(date.currentTarget.value).to).format(
        "DD/MM/YYYY"
      )}`
    );
  };

  const onClickDailyNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentDailyCalendar(getCalendarDates(y, m));
  };

  const onClickDailyPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentDailyCalendar(getCalendarDates(y, m));
  };

  const onClickWeeklyNextMonth = (year, month) => () => {
    let m = parseInt(month) + 1;
    let y = year;
    if (m == 13) {
      m = 1;
      y++;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentWeeklyCalendar(getWeekRangeList(y, m));
  };

  const onClickWeeklyPrevMonth = (year, month) => () => {
    let m = parseInt(month) - 1;
    let y = year;
    if (m == 0) {
      m = 12;
      y--;
    }
    setDate({
      currentMonth: m,
      currentMonthString: moment(m.toString()).format("MMMM"),
      currentYear: y
    });
    setCurrentWeeklyCalendar(getWeekRangeList(y, m));
  };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return (
        <div className="calendar-daily-component">
          <Row className="calendar-daily-component__header">
            <Col span={7}>
              <Button
                className="calendar-daily-component__header__prev-month-button"
                onClick={onClickDailyPrevMonth(
                  date.currentYear,
                  date.currentMonth
                )}
              >
                <Icon type="left" />
              </Button>
            </Col>
            <Col span={10}>
              <h3 className="calendar-daily-component__header__month-string">
                {`${date.currentMonthString} ${date.currentYear}`}
              </h3>
            </Col>
            <Col span={7}>
              <Button
                className="calendar-daily-component__header__next-month-button"
                onClick={onClickDailyNextMonth(
                  date.currentYear,
                  date.currentMonth
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
            {currentDailyCalendar.map(week => {
              return (
                <Row type="flex" justify="center" gutter={[8, 8]}>
                  {week.map(day => {
                    console.log(day);
                    return (
                      <Col span={3}>
                        <Button
                          className={
                            moment(day).format("DD-MMMM-YYYY") === selectedDate
                              ? "calendar-daily-component__body__dates__active"
                              : "calendar-daily-component__body__dates"
                          }
                          value={day}
                          onClick={onClickDailyDate}
                        >
                          {moment(day).format("DD MMMM YYYY") ===
                          today.fullDate ? (
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
    } else if (calendarType === "weekly") {
      return (
        <div className="calendar-weekly-component">
          <Row className="calendar-weekly-component__header">
            <Col span={7}>
              <Button
                className="calendar-weekly-component__header__prev-month-button"
                onClick={onClickWeeklyPrevMonth(
                  date.currentYear,
                  date.currentMonth
                )}
              >
                <Icon type="left" />
              </Button>
            </Col>
            <Col span={10}>
              <h3 className="calendar-weekly-component__month-string">
                {`${date.currentMonthString} ${date.currentYear}`}
              </h3>
            </Col>
            <Col span={7}>
              <Button
                className="calendar-weekly-component__header__next-month-button"
                onClick={onClickWeeklyNextMonth(
                  date.currentYear,
                  date.currentMonth
                )}
              >
                <Icon type="right" />
              </Button>
            </Col>
          </Row>
          {/* {console.log(getWeekRangeList(2019, 12))} */}
          <div className="calendar-weekly-component__body">
            <List>
              {currentWeeklyCalendar.map((item, index) => {
                console.log(item);
                return (
                  <List.Item>
                    <Button
                      className="calendar-weekly-component__body__list-button"
                      className={
                        `${moment(item.from).format("DD/MM/YYYY")} - ${moment(
                          item.to
                        ).format("DD/MM/YYYY")}` === selectedDate
                          ? "calendar-weekly-component__body__list-button__active"
                          : "calendar-weekly-component__body__list-button"
                      }
                      value={JSON.stringify(item)}
                      onClick={onClickWeeklyDate}
                    >
                      <Row>
                        <Col
                          span={6}
                          className="calendar-weekly-component__body__week-count-col"
                        >
                          Minggu ke-{index + 1}
                        </Col>
                        <Col span={4} offset={8}>{`${moment(item.from).format(
                          "DD/MM/YYYY"
                        )} - ${moment(item.to).format("DD/MM/YYYY")}`}</Col>
                      </Row>
                    </Button>
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
      </div>
    </div>
  );
};

export default Calendar;
