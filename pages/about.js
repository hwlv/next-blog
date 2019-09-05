import Layout from '../app/components/Layout'

function About() {
  return (
    <Layout title="关于我">
      <div className="about">
        这是用nodejs搭建的个人博客，其它功能还在开发中。。。
      </div>
      { /*language=SCSS*/}
      <style jsx>{`
        .about {
          padding: 15px 20px;
          font-size: 15px;
        }
      `}</style>
    </Layout>
  )
}

export default About
