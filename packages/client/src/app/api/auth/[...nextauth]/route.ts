import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.qq.com',
        port: 587,
        secure: false,
        auth: {
          user: '2638526903@qq.com', // 我的邮箱
          pass: 'ltygpxadoolvdijf', // 授权码
        },
      },
      from: '2638526903@qq.com',
    }),
  ],

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
