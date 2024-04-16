import { envConfig } from '@alice/server/config'
import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter: Transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: envConfig.EMAIL_USER,
        pass: envConfig.EMAIL_TOKEN,
      },
    })
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: envConfig.EMAIL_USER, // 发送者
      to, // 接收者，可以是多个，逗号分隔
      subject, // 主题
      text, // 文本内容
    }

    await this.transporter.sendMail(mailOptions)
  }
}
