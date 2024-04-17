import { envConfig } from '@alice/server/config'
import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

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

  async sendMail(config: Mail.Options): Promise<void> {
    const mailOptions = {
      from: envConfig.EMAIL_USER, // 发送者
      ...config,
    }

    await this.transporter.sendMail(mailOptions)
  }
}
