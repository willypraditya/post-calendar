import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./header.scss";

const { Header } = Layout;

const HeaderLayout = () => (
  <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item className="header-menu" key="1">
        <Link to="/">Welcome</Link>
      </Menu.Item>
      <Menu.Item className="header-menu" key="2">
        <Link to="/about">About</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default HeaderLayout;
