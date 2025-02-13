import * as nodemailer from 'nodemailer';

export class MailerService {
  private transporter: nodemailer.Transporter;

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

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
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
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
