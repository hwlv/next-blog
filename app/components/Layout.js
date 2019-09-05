import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
// import Router, {withRouter} from 'next/router'
// import {connect} from 'react-redux'
// import {Layout, Menu, Input, Avatar, Tooltip, Icon, Dropdown, Button} from 'antd'
// const {Header, Content, Footer} = Layout
import Header from './Header'

const config = require('../../config');

function MyLayout({ children, user, router, logout, title = 'blog'  }) {
  // console.log('MyLayout ' + title)
  const noHeader = [
    '/admin'
  ]
  const headerVisible = noHeader.includes(router.pathname)
  return (
    <React.Fragment>
      {/*  <title>{title}</title>*/}
      {/*  <meta charSet='utf-8' />*/}
      {/*  <meta name='viewport' content='initial-scale=1.0, width=device-width' />*/}
      {/*</Head>*/}
      {/* <h1>{time}</h1> */}
      {/*<Header/>*/}
      <div className="app">
        {headerVisible ? '' : <Header />}
        {children}
      </div>
      { /*language=SCSS*/ }
      <style jsx>{`
      .app{
        //margin-top: 54px;
        background-color: rgb(255, 255, 255);
        //padding: 54px 20px 0;
        padding-top: 54px;
        transition: .15s;
        position: relative;
      }
        
       `}</style>
    </React.Fragment>
  )
}

export default withRouter(MyLayout)
