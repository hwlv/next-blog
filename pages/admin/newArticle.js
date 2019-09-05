import React from "react";
import { connect } from "react-redux";
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import marked from 'marked'
import highlight from 'highlight.js'
import { Menu, Dropdown, Icon, message } from 'antd';
import { getAllTag } from '../../app/api/tags'
import { addArticle, updateArticle, getArticleDetail } from '../../app/api/articles'
import 'highlight.js/styles/github.css'

const AceEditor = dynamic(import('../../app/components/AceEditor'), {
  ssr: false
})
const AdminLayout = dynamic(import('../../app/components/AdminLayout'), {
  ssr: false
})

const initialSource = `
## 表格
| 1 | 2 |3  |
| --- | --- | --- |
| 3 |  4| 4 |
| 4 | 4 |  4|
|  4| 34 | 4 |

## 分割线
***

## 引用
> ddfjdkjfkj

## 链接
[百度](http://www.baidu.com)

## 列表

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三

## html
<p style="color:red;font-size: 20px;">demo</p>

## 代码块
\`\`\`js
var React = require('react');
\`\`\`
`
marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value
  }
})

class newArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articleId: '',
      text: '',
      title: '',
      tags: [],
      tag_id: null,
      tagName: '',
      content: initialSource,
      previewContent: marked(initialSource, { breaks: true })
    }
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  componentDidMount() {
    if (!this.props.user.name) return;
    console.log(this.props.router.query)
    const id = this.props.router.query.id
    // 如果有文章id就获取文章详情
    if (id) {
      getArticleDetail({ id }).then((res) => {
        const { data } = res
        this.setState({
          articleId: id,
          content: data.content,
          title: data.title,
          previewContent: marked(data.content, { breaks: true }),
          tagName: data.tags.name,
          tag_id: data.tags._id
        })
      })
    }
    getAllTag().then((res) => {
      this.setState({
        tags: res.data
      })
    })
  }

  handleMarkdownChange(newVal) {
    this.setState({
      content: newVal,
      previewContent: marked(newVal, { breaks: true })
    })
  }

  handleMenuClick({ key }) {
    const tag = this.state.tags.find((item) => item._id === key)
    this.setState({
      tag_id: key,
      tagName: tag.name
    })
  }

  handleInput(e) {
    this.setState({
      title: e.target.value
    })
  }

  handlePost() {
    if (!this.state.title) {
      message.warn('请输入标题')
      return
    }
    if (!this.state.tagName) {
      message.warn('请选择标签')
      return
    }
    if (!this.state.tagName) {
      message.warn('请输入文章内容')
      return
    }
    if (this.state.articleId){
      updateArticle({
        id: this.state.articleId,
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tag_id
      }).then((res) => {
        message.success('更新成功')
      }, (err) => {
        message.error('更新失败')
      })
    } else {
      addArticle({
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tag_id
      }).then((res) => {
        message.success('添加成功')
      }, (err) => {
        message.error('添加失败')
      })
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick} placement="bottomRight">
        {
          this.state.tags.map((tag, index) => {
            return (
              <Menu.Item key={tag._id}>
                {tag.name}
              </Menu.Item>
            )
          })
        }
      </Menu>
    );

    return (
      <AdminLayout>
        <div className="markdown_app">
          <div className="editor-header">
            <input type="text"
              value={this.state.title}
              onChange={(e) => this.handleInput(e)}
              className="title-input"
              placeholder="输入文章标题"/>
            <div className="right-box">
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  {this.state.tagName || '选择标签'} <Icon type="down"/>
                </a>
              </Dropdown>
              <span className="toggle-btn" onClick={this.handlePost}>发布</span>
            </div>
          </div>
          <div className="main">
            <div className="editor-box">
              <AceEditor
                mode="javascript"
                theme="monokai"
                onChange={this.handleMarkdownChange}
                value={this.state.content}
                name="ace-edit"
              />
            </div>
            <div className="content-preview">
              <div className="content-html" dangerouslySetInnerHTML={{ __html: this.state.previewContent }}>
              </div>
            </div>
          </div>
        </div>
        { /*language=SCSS*/}
        <style global jsx>{`
          html, body {
            width: 100%;
            height: 100%;
          }

          .markdown_app {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .editor-header {
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              padding: 0 10px;
              height: 50px;
              background-color: rgb(255, 255, 255);
              border-bottom: 1px solid rgb(221, 221, 221);
              z-index: 100;

              .title-input {
                flex: 1 1 auto;
                height: 100%;
                margin: 0;
                padding: 0;
                font-size: 24px;
                font-weight: 700;
                color: rgb(0, 0, 0);
                border: none;
                outline: none;
              }

              .toggle-btn {
                font-size: 22px;
                margin-left: 10px;
                white-space: nowrap;
                color: rgb(0, 127, 255);
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
            }

            .main {
              display: flex;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .editor-box {
              flex: 1 1 50%;
              //padding: 5px;
              font-size: 16px;
              position: relative;

              textarea {
                width: 100%;
                height: 900px;
              }
            }

            .content-preview {
              display: flex;
              flex-direction: column;
              flex: 1 1 50%;
              padding: 15px;
              border-left: 1px solid rgb(221, 221, 221);
              overflow: hidden;
            }
          }

          .content-html {
            word-break: break-word;
            overflow-x: hidden;

            pre {
              & > code {
                font-size: .8em;
                padding: .5em 1em;
                margin: 0;
                word-break: normal;
                display: block;
                color: rgb(51, 51, 51);
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                color: rgb(51, 51, 51);
                background: rgb(248, 248, 248);
              }
            }

            blockquote {
              margin: 1em 0;
              border-left: 4px solid rgb(221, 221, 221);
              padding: 0 1em;
              color: rgb(102, 102, 102);

              p {
                margin: .5em 0;
              }
            }

            tr {
              border-top: 1px solid #c6cbd1;
              background: #fff;
            }

            th,
            td {
              padding: 6px 13px;
              border: 1px solid #dfe2e5;
            }

            table tr:nth-child(2n) {
              background: #f6f8fa;
            }
          }

          .right-box {
            font-size: 20px;
          }

          .ant-dropdown-menu-item {
            //font-size: 24px;
          }

        `}</style>
      </AdminLayout>
    )
  }
}

export default withRouter(connect(function mapState(state) {
  return {
    user: state.user
  }
})(newArticle))
