"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer = require("nodemailer");
class MailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'info@thehhi.com',
                pass: 'qche xvxd gxbg qmlf',
            },
        });
    }
    async sendMail(to, subject, text, html) {
        const mailOptions = {
            from: '<noreply.info@thehhi.com>',
            to: to,
            subject: subject,
            text: text,
            html: html,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map