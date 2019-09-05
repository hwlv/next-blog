import dynamic from 'next/dynamic'
import React from 'react'
import { connect } from "react-redux";
import { getUsers } from '../../app/api/user'
import { Table, Pagination } from 'antd';

const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})
const columns = [{
  title: '姓名',
  dataIndex: 'username',
  key: 'name',
  render: text => <a href="#">{text}</a>
}, {
  title: 'ID',
  dataIndex: '_id',
  key: 'ID'
}, {
  title: '密码(加密后)',
  dataIndex: 'password',
  key: 'password'
},
{
  title: '身份',
  dataIndex: 'type',
  key: 'address'
}
];

class managerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      total: 0
    }
    this.getUserList = this.getUserList.bind(this)
  }

  getUserList(pageNum){
    this.setState({
      pageNum
    })
    getUsers({ pageNum: pageNum }).then((res) => {
      this.setState({
        list: res.data.list,
        total: res.data.total
      })
    })
  }

  componentDidMount() {
    if (!this.props.user.name) return;
    this.getUserList(this.state.pageNum)
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <h2>用户管理</h2>
          <Table
            bordered
            rowKey="_id"
            className='table'
            pagination={false}
            columns={columns}
            size="middle"
            dataSource={this.state.list}/>
          <div>
            <Pagination
              onChange={(pageNum) => {
                this.getUserList(pageNum);
              }}
              current={this.state.pageNum}
              total={this.state.total}/>
          </div>
          { /*language=SCSS*/}
          <style global jsx>{`
            .table {
              min-height: 550px;
              margin-top: 10px;
            }

            .table ~ div {
              text-align: center;
            }
          `}</style>
        </div>

      </AdminLayout>
    )
  }
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(managerUser)
