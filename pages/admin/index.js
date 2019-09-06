import { Component } from "react";
import dynamic from 'next/dynamic'
import { connect } from "react-redux";

const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})

class AdminManage extends Component {

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
