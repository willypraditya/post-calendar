import React, { useState } from "react";
import "./calendar.scss";
import calendarIcon from "../../assets/ic-calendar.svg";
import dropdownIcon from "../../assets/ic-dropdown.svg";

import { Card } from "antd";

const Calendar = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleCalendarClick = () => {};

  return (
    <div className="calendar-component">
      <div className="calendar-input">
        <img className="calendar-input__calendarIcon" src={calendarIcon} />
        {/* <img className="calendar-input__dropdownIcon" src={dropdownIcon} /> */}
        <input
          readonly
          type="button"
          spellcheck="false"
          value="Minggu ke-2 November 2019"
          className="calendar-input__input"
          // onclick={}
        ></input>
      </div>
      <div className="calendar-container">
        <h1>tes</h1>
      </div>
    </div>
  );
};

export default Calendar;
