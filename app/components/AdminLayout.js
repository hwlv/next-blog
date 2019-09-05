import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import AdminMenu from './AdminMenu'
import { Button } from 'antd'

class AdminLayout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user && this.props.user.name ?
          <div className="container">
            <div className="menuContainer">
              <AdminMenu history={this.props.history}
                url={this.props.router.pathname}
                changeUrl={this.props.change_location_admin}/>
            </div>
            <div className="contentContainer">
              {this.props.children}
              {/*{React.cloneElement(this.props.children, { user: this.props.user })}*/}
            </div>
          </div> : <div className="lost-wrapper"><Button onClick={() => window.location.href = '/login'} type="primary">先登录</Button></div>
        }

        { /*language=SCSS*/}
        <style global jsx>{`
          body,html {
            height: 100%;
          }
          .container {
            display: flex;
            flex-direction: row;
            background: white;
            position: fixed;
            height: 100%;
            top: 0;
            width: 100%;
          }

          .menuContainer {
            width: 15%;
            height: 100%;
            background: #404040;
          }

          .contentContainer {
            width: 85%;
            overflow-y: scroll;
            padding: 20px;
          }

          .lost-wrapper {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            font-size: 100px;
            color: rgb(67, 78, 89);
            background: rgb(240, 242, 245);

            .login-a {
              &:hover {
                text-decoration: underline;
              }
            }
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(function mapState(state) {
  return {
    user: state.user
  }
})(AdminLayout))
