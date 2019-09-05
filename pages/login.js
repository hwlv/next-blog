import React from "react";
import Router from 'next/router'
import { message } from 'antd'
import LoginForm from '../app/components/Login'
import { login, register } from '../app/api/user'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  async handleLogin(username, password) {
    console.log(username, password)
    console.log('login')
    login({ username, password }).then((res) => {
      window.location.href = '/admin'
    }, (err) => {
      message.error(err.data)
    })
  }

  async handleRegister(data) {
    register({ username: data.userName, password: data.password })
      .then((res) => {
        message.success('注册成功')
      })
      .catch((res) => {
        message.error(res.data)
      })
    // if(result)
  }

  render() {
    return (
      <div className="login-wrapper">
        <LoginForm login={this.handleLogin} register={this.handleRegister}/>
        { /*language=SCSS*/}
        <style global jsx>{`
          html, body {
            height: 100%;
          }
          
          .login-wrapper {
            background: rgb(238, 238, 238);
            width: 100%;
            height: 100%;
            display: flex;
            //align-items: center;
            justify-content: center;

            .container {
              background: rgb(255, 255, 255);
              display: flex;
              flex-direction: column;
              height: 300px;
              width: 300px;
              margin-top: 5%;
            }

            .formStyle {
              width: 70%;
              margin-left: 15%;
              text-align: center;
            }

            .loginButton {
              width: 60%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Login
