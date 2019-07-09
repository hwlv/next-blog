import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Router, { withRouter } from 'next/router'

import 'antd/dist/antd.css'
import MyLayout from '../components/Layout'

export default class MyApp extends App {

    componentDidCatch (error, errorInfo) {
        console.log('CUSTOM ERROR HANDLING', error)
        // This is needed to render errors correctly in development / production
        super.componentDidCatch(error, errorInfo)
    }
    
    /**
     * 自定义App getInitialProps 可以拿到 Component。即重写getInitialProps 方法。
     * 每次页面切换都会调用
     * @param Component
     * @param router
     * @param ctx
     * @returns {Promise<{pageProps}>}
     */
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
        console.log('app getInitialProps ...')
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    // state = {
    //     context: 'value',
    // }


    render(){
        const { Component, pageProps } = this.props
        // console.log(Component)
        return (
            <Container>
                <MyLayout>
                    <Component { ...pageProps }/>
                </MyLayout>
            </Container>
        )
    }
}


