import React from "react";
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { Pagination } from 'antd';
import { connect } from 'react-redux'
import { ManagerArticleCell } from '../../app/components/ManagerArticleCell'

const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})
import { getArticles, deleteArticle } from '../../app/api/articles'
import {  message } from 'antd'

class managerArticle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      articleList: [],
      pageNum: 1,
      total: 0
    }
    this.get_article_list = this.get_article_list.bind(this)
  }

  get_article_list(pageNum) {
    this.setState({
      pageNum
    })
    getArticles({ pageNum }).then((res) => {
      this.setState({
        articleList: res.data.list,
        total: res.data.total
      })
    })
  }

  componentDidMount() {
    if (!this.props.user.name) return;
    this.get_article_list(this.state.pageNum)
  }

  edit_article(id) {
    Router.push('/admin/newArticle?id=' + id)
  }

  get_article_detail() {

  }

  delete_article(id) {
    deleteArticle({ id }).then((res) => {
      message.success('删除成功')
    }, (err) => {
      message.error('删除失败')
    })
  }

  render() {
    return (
      <AdminLayout>
        <div className="article-container">
          <h2>文章管理</h2>
          <div className="articleListContainer">
            {
              this.state.articleList.map((item, index) => (
                <ManagerArticleCell
                  edit_article={(id) => this.edit_article(id)}
                  history={this.props.history}
                  getArticleDetail={(id) => this.get_article_detail(id)}
                  delete={(id) => this.delete_article(id)}
                  key={index} data={item}/>
              ))
            }
          </div>
          <div className="paginationStyle">
            <Pagination
              defaultPageSize={5}
              onChange={(pageNum) => {
                this.get_article_list(pageNum);
              }}
              current={this.state.pageNum}
              total={this.state.total}
            />
          </div>
        </div>
        { /*language=SCSS*/}
        <style global jsx>{`
          .article-container {
            .articleListContainer {
              margin-top: 10px;
              height: 600px;
              overflow: scroll;
            }

            .paginationStyle {
              margin-top: 20px;
              text-align: center;
            }

            .cellContainer {
              border-bottom: solid thin #ddd;
              display: flex;
              flex-direction: row;
              height: 80px;
            }

            .cellAboutArticle {
              display: flex;
              flex-direction: column;
              flex: 4;
              align-content: center;
              justify-content: center;
            }

            .cellState {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
            }

            .cellOperation {
              flex: 2;
              display: flex;
              align-items: center;
              justify-content: space-around;
            }

            .articleTitle {
              margin-bottom: 10px;
              font-size: 15px;
              color: #000;
            }

            .articleInfo span {
              font-size: 12px;
              margin-right: 10px;
              display: inline-block;
              color: #6b6b6b;
            }
          }
        `}</style>
      </AdminLayout>
    )
  }
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(managerArticle)
