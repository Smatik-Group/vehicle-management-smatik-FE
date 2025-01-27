import React, { useState } from "react";
import { Layout, Menu, Switch } from "antd";
import { Link, Outlet } from "react-router-dom";
import { CarOutlined, HomeOutlined, SettingOutlined, BulbOutlined } from "@ant-design/icons";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalStyles";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <div
            style={{
              height: "60px",
              margin: "16px",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{
                maxWidth: "40px",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            MyEnterprise
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CarOutlined />}>
              <Link to="/personenwagen">Personenwagen</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              <Link to="/settings">Einstellungen</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
            <h2>Admin Dashboard</h2>
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              onChange={toggleTheme}
            />
          </Header>
          <Content style={{ margin: "16px", padding: "24px", background: "#fff", borderRadius: "8px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            MyEnterprise ©2025 Powered by Ant Design
          </Footer>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default AppLayout;
