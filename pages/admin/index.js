import { Component } from "react";
// import '../../src/styles/admin.scss'
import dynamic from 'next/dynamic'
import { connect } from "react-redux";
import request from "../../app/util/request";
import newArticle from "./newArticle";

const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})

class AdminManage extends Component {
  // static async getInitialProps ({ Component, router, ctx }) {
  //   console.log('ctx')
  //   // console.log(ctx)
  //   return { name: 'jack' }
  // }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.user)
  }

  render() {
    console.log('preview render..')
    return (
      <AdminLayout >
        Hello! {this.props.user.name},欢迎登陆后台管理系统！
      </AdminLayout>
    )
  }
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(AdminManage)
