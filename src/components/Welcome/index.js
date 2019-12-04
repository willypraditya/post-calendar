import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./welcome.scss";
import Calendar from "../Calendar";

import {
  Card,
  Button,
  Input,
  Icon,
  Dropdown,
  Menu,
  Row,
  Col,
  DatePicker
} from "antd";

// import Calendar from "react-calendar";
// import Calendar from "react-calendar/dist/entry.nostyle";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Welcome = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState("daily");

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleVisibleChange = () => {
    setVisible(prevState => {
      return !prevState;
    });
  };

  const handleDatePicker = () => {
    setDatePickerVisible(prevState => {
      return !prevState;
    });
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
          <Button className="calendar-menu-button" onClick={handleDatePicker}>
            Harian
          </Button>
          <DatePicker open={datePickerVisible}></DatePicker>
        </Col>
        <Col span={6}>
          <Button className="calendar-menu-button">Mingguan</Button>
        </Col>
        <Col span={6}>
          <Button className="calendar-menu-button">Bulanan</Button>
        </Col>
        <Col span={6}>
          <Button className="calendar-menu-button">Tahunan</Button>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div style={{ margin: "20px" }}>
      <div>
        {/* <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Input
            className="calendar"
            prefix={<Icon type="calendar" />}
            suffix={<Icon type="caret-down" />}
            // onClick={onCalendarClick}
            placeholder="Calendar"
          ></Input>
        </Dropdown> */}
        <Calendar></Calendar>
      </div>
    </div>
  );
};

export default Welcome;
