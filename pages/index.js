import React from 'react'
import Link from 'next/link'

import Layout from '../app/components/Layout'
import { getArticles } from '../app/api/articles'
import { Icon, Pagination } from "antd"

class Index extends React.Component {

  static async getInitialProps({ req, query }) {
    const isServer = typeof window === 'undefined'
    if (isServer) {
      console.log('server...')
      return {
        articles: query.list,
        total: query.total
      }
    } else {
      console.log('client...')
      let { data } = await getArticles()
      return {
        articles: data.list,
        total: data.total
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      total: props.total,
      articles: props.articles
    }
  }

  turnPage(pageNum) {
    this.setState({
      pageNum
    })
    getArticles({ pageNum }).then((res) => {
      this.setState({
        articles: res.data.list,
        total: res.data.total
      })
    })
  }

  render() {
    return (
      <Layout title="主页">
        <div className="article-container">
          {
            this.state.articles.map((item, index) => {
              const tagElem = (
                <article className="article" key={index}>
                  <h2 className="article_hd">
                    <Link href={`/detail/${item._id}`}>
                      <a className="article_tt">{item.title}</a>
                    </Link>
                  </h2>
                  <div className="article_info">
                    <span className="hide-sm">发表于 </span>
                    <time>{item.createdAt.slice(0, 10)}</time>
                    {' | '}
                    <span>阅读({item.viewCount})</span>
                    {' | '}
                    <span className="hide-sm">分类于 </span>
                    <span className="show-sm">
                      <Icon type="tag"/>
                    </span>
                    <a href="" className="hover-highlight">{item.tags.name}</a>
                  </div>
                </article>
              );
              return tagElem
            })
          }
        </div>
        <div className="paginationStyle">
          {
            this.state.total > 10 ?
              <Pagination
                defaultPageSize={8}
                onChange={(pageNum) => {
                  this.turnPage(pageNum);
                }}
                current={this.state.pageNum}
                total={this.state.total}
              /> : ''
          }
        </div>
        { /*language=SCSS*/}
        <style jsx>{`
          .article-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            padding-top: 20px;
          }

          .paginationStyle {
            margin-top: 20px;
            text-align: center;
          }

          .article {
            margin-bottom: 10px;
            font-size: 16px;
            color: rgb(51, 51, 51);

            .article_info {
              font-size: 12px;
              color: rgb(153, 153, 153);
              word-spacing: 3px;
            }

            .show-sm {
              display: inline-block;
              margin-right: 5px;
            }

            .hover-highlight {
              color: rgb(102, 102, 102);
              transition: border-color ease .3s;
              border-bottom: 1px solid rgb(214, 214, 214);

              &:hover {
                color: #000;
                border-color: #000;
              }
            }

            .article_tt {
              position: relative;
              color: rgb(51, 51, 51);

              &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -3px;
                height: 2px;
                width: 100%;
                background: currentcolor;
                -webkit-transform: scaleX(0);
                -ms-transform: scaleX(0);
                transform: scaleX(0);
                -webkit-transition: all ease .2s;
                -o-transition: all ease .2s;
                transition: all ease .2s;
              }

              &:hover {
                &:after {
                  -webkit-transform: scaleX(1);
                  -ms-transform: scaleX(1);
                  transform: scaleX(1);
                }
              }
            }
          }

        `}</style>
      </Layout>
    )
  }

}

export default Index
