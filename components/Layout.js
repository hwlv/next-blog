import React, {useState, useCallback, useEffect} from 'react'
import Link from 'next/link'
// import Head from 'next/head'
import Router, {withRouter} from 'next/router'
// import {connect} from 'react-redux'
import {Layout, Menu, Input, Avatar, Tooltip, Icon, Dropdown, Button} from 'antd'
const {Header, Content, Footer} = Layout

const config = require('../config');

function MyLayout({children, user, router: {query}, logout}) {
    console.log(config)
    return (
        <React.Fragment>
            <div>
                <Link href='/admin' as='/admin'>
                     <a>admin</a>
                </Link>
                <Link href='/about' as='/about'>
                    <a>about</a>
                </Link>
                {config.github.github_auth_url}
                <a href={config.github.github_auth_url}>
                    登录
                </a>
            </div>
            {children}
            <style jsx>{`
            header{
                background: rgb(255, 255, 255);
            }
            `}</style>
        </React.Fragment>
    )
}

export default withRouter(MyLayout)
