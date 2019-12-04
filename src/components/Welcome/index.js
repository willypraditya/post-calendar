import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./welcome.scss";
import Calendar from "../Calendar";
import moment from "moment";

import { Card, Button, Input, Icon, Dropdown, Menu, Row, Col } from "antd";

import DayPicker from "react-day-picker";

const Welcome = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [visible, setVisible] = useState(false);
  const [calendarType, setCalendarType] = useState("");

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const renderCalendar = () => {
    if (calendarType === "daily") {
      return <DayPicker onDayClick={handleDayClick} />;
    } else if (calendarType === "weekly") {
      return (
        <DayPicker
          selectedDays={selectedDays}
          showWeekNumbers
          showOutsideDays
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
          onDayMouseEnter={this.handleDayEnter}
          onDayMouseLeave={this.handleDayLeave}
          onWeekClick={this.handleWeekClick}
        />
      );
    }
  };

  const handleClickDaily = () => {
    setCalendarType("daily");
  };

  const handleDayClick = day => {
    setSelectedDate(moment(day).format("DD-MM-YYYY"));
  };

  const handleClickWeekly = () => {
    setCalendarType("weekly");
  };

  const modifiersStyles = {
    birthday: {
      color: "white",
      backgroundColor: "#ffc107"
    },
    thursdays: {
      color: "#ffc107",
      backgroundColor: "#fffdee"
    }
  };

  const menu = (
    <Card>
      <Row
        gutter={8}
        className="calendar-menu-row"
        type="flex"
        justify="center"
      >
        <Col span={6}>
          <Button className="calendar-menu-button" onClick={handleClickDaily}>
            Harian
          </Button>
        </Col>
        <Col span={6}>
          <Button className="calendar-menu-button" onClick={handleClickWeekly}>
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
