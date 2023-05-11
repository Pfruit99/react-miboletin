// import { Link } from "react-router-dom";
import 'antd/dist/reset.css';
import React, { useState } from 'react';
import Cards from './cards';







// import {blue, cyan, green, yellow, red, gray} from '@ant-design/colors';

// import {
//   red,
//   volcano,
//   gold,
//   yellow,
//   lime,
//   green,
//   cyan,
//   blue,
//   geekblue,
//   purple,
//   magenta,
//   grey,
// } from '@ant-design/colors';


import {

  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SettingFilled,
  HomeFilled,
  BookFilled,
  BulbOutlined,
  InfoCircleOutlined
  

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('inicio', '1', <HomeFilled />),
  getItem('asignatura', '2', <BookFilled />),
  getItem('rector', '3', <BulbOutlined />),
  getItem('Docente', '4', <TeamOutlined />,),
  getItem('estudiantes', '5', < UserOutlined/>),
  getItem('valoraciones', '6', <  FileOutlined />),
  getItem('configuraciones', '7', <  SettingFilled   />),
  getItem('Sobre esto', '8', <   InfoCircleOutlined  />),
];











const Sidebar: React.FC = () => {
 
 

 
 
 
 
 
 
 
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ padding: '0 50px',}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-content'   style={{padding: 24, minHeight: 360, background: colorBgContainer }}>
           

        <Cards/>




          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;