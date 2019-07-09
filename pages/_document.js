import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta charSet='utf-8' />
                <link rel="icon" type="image/x-icon" href="../static/favicon.png" />
                <script dangerouslySetInnerHTML={{__html: `var _hmt = _hmt || [];
                (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?d1890d96fa5a0652dd3521784eed8b78";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();`}} />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        )
    }
}
