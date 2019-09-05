import React from 'react';
import ActiveLink from '../ActiveLink'
class Header extends React.Component {

  render() {
    return (
      <div className="header-wrap">
        <div className="navbar-header">
          <div className="site-brand">
            <ActiveLink href='/'>
              南柯一梦
            </ActiveLink>
          </div>
          <ul className='nav-menu navbar-nav'>
            <li className="nav-item">
              <ActiveLink href='/'>
                主页
              </ActiveLink>
            </li>
            <li className="nav-item">
              <ActiveLink href='/about'>
                关于
              </ActiveLink>
            </li>
          </ul>
        </div>
        { /*language=SCSS*/}
        <style global jsx>{`
          .header-wrap {
            display: block;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 900;
            width: 100%;
            box-shadow: 0 5px 4px -4px rgba(25, 25, 25, .1);
            color: rgb(136, 136, 136);
            background: rgb(255, 255, 255);

            a {
              color: rgb(136, 136, 136);
            }

            .navbar-header {
              max-width: 960px;
              margin: 0 auto;

              &:after {
                content: " ";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
              }
            }

            .site-brand {
              float: left;
              height: 54px;
              padding-left: 10px;
              text-align: center;
              transition: all .1s linear;
              line-height: 54px;
              position: relative;
            }

            .nav-menu {
              text-align: center;
              height: 54px;
              line-height: 54px;
              margin: 0;
            }

            .navbar-nav {
              display: flex;
              list-style: none;
              float: right;
              height: 54px;
              padding-right: 10px;
            }

            .nav-item {
              list-style: none;
              display: inline-block;
              margin: 0 14px;
            }

            .nav-item a {
              display: block;
              transition: all .1s linear;
              color: rgb(136, 136, 136);
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Header
