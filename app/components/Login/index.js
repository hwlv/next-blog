import React, { Component } from 'react'
import { Tabs } from 'antd';
import LoginForm from './loginFrom.js'
import RegisterForm from "./registerForm.js";
const TabPane = Tabs.TabPane;

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { login, register } = this.props;
    return (
      <Tabs defaultActiveKey="1" tabBarStyle={{ textAlign: 'center' }} className="container">
        <TabPane tab="登录" key="1">
          <LoginForm login={login}/>
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm register={register}/>
        </TabPane>
      </Tabs>
    )
  }
}

