'use strict'

const nodemailer = require('nodemailer')
const config = require('../../config')

module.exports = {

    /**
     * Comment notification
     *
     * @param {Object} options
     * @param {Function} cb
     * @api public
     */

    comment(options) {
        const article = options.article
        // const author = article.user
        const user = options.currentUser
        const articleUrl = `http://www.lvhongwang.com/blog/${article.id}`
        const commentHtml = `<div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="">
                #Re${article.title}:<br><br>
                ${options.comment}
                <hr>
                评论者:
                <a href="http://home.cnblogs.com/u/1675013/" target="_blank" rel="noopener">
                ${user.name}
                </a>
                <br>
                URL:
                <a href="${articleUrl}" target="_blank" rel="noopener">
                ${articleUrl}
                </a>`

        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            service: 'qq',
            port: 465,
            secureConnection: true, // 使用了 SSL
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'likeawang@qq.com', // generated ethereal user
                pass: 'okfuushytsvncada'// generated ethereal password
            }
        })

        let option = {
            from: 'likeawang@qq.com', // sender address
            to: 'wistarialv@163.com', // list of receivers
            subject: '[博客评论通知]Re:Web前端之iframe详解', // Subject line
            text: 'Hello world?', // plain text body
            html: commentHtml,
            attachments:
                [{
                    filename: 'banner_1.jpg', // 附件名
                    path: 'https://hbimg-other.huabanimg.com/img/promotion/73c21d9c77e6788fa350b7460c2043a477de76857967', // 附件路径
                    cid: 'fn_01' // _id 可被邮件使用
                }]
        }
        transporter.sendMail(option, function (error, response) {
            if (error) {
                console.log('fail: ' + error)
            } else {
                console.log('success: ' + response.message)
            }
        })
    }
}
