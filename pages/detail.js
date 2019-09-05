import React from 'react'
import { withRouter } from 'next/router'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
const config = require('../config');
import 'highlight.js/styles/default.css';
import Layout from '../app/components/Layout'

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value
  }
})

class Detail extends React.Component {

  static async getInitialProps({ req, query }) {
    const isServer = typeof window === 'undefined'
    if (isServer) {
      return {
        detail: query
      }
    } else {
      return {}
    }
  }

  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: config.github.client_id,
      clientSecret: config.github.client_secret,
      id: window.location.pathname,
      title: this.props.detail.title,
      repo: 'gitalk',
      owner: 'hwlv',
      admin: ['hwlv']
    })
    gitalk.render('gitalk-container')
  }

  render() {
    const content = marked(this.props.detail.content, { breaks: true })
    return (
      <Layout title="详情页">
        <div className="detail-container">
          {/*<Header/>*/}
          <div className="content-preview">
            <div className="content-html" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
          </div>
          <div id="gitalk-container"></div>
        </div>
        { /*language=SCSS*/}
        <style global jsx>{`
          .detail-container {
            padding: 15px 30px;

          }

          .content-preview {
            display: flex;
            padding: 15px;
            overflow: hidden;
          }

          .content-html {
            word-break: break-word;
            overflow-x: hidden;
            width: 100%;

            pre {
              display: block;
              padding: 14px;
              background-color: rgb(246, 248, 250);
              border-radius: 3px;

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
        `}</style>
      </Layout>
    )
  }

}

export default withRouter(Detail)
