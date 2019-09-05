import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import Router from 'next/router'

const menus = [
  { url: '/admin', name: '首页', iconType: 'home' },
  { url: '/admin/managerUser', name: '用户管理', iconType: 'usergroup-delete' },
  { url: '/admin/newArticle', name: '发文', iconType: 'file-text' },
  { url: '/admin/managerTags', name: '标签管理', iconType: 'tags-o' },
  { url: '/admin/managerArticle', name: '文章管理', iconType: 'edit' }
];

export default class AdminMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Menu
          selectedKeys={[this.props.url]}
          mode="inline"
          theme="dark"
          onClick={({ key }) => {
            console.log(key)
            Router.push(key)
          }}
        >
          {
            menus.map((item, index) =>
              <Menu.Item key={item.url} >
                <Icon type={item.iconType}/>
                <span>{item.name}</span>
              </Menu.Item>)
          }

        </Menu>
        { /*language=SCSS*/ }
        <style jsx>{`
           .header{
              background: white;
            }
            .header>img{
              width: 20%;
            }
         `}</style>
      </div>
    )
  }

}
