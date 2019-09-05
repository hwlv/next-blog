import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import '../app/styles/common.css'
import withReduxStore from '../app/lib/with_redux'

console.log('_app.js...........')

class MyApp extends App {

  componentDidCatch(error, errorInfo) {
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    const { title } = pageProps || 'blog'
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps}/>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
