import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { data } = await axios.post('http://localhost:3000/user/login', ({
          username: credentials.username,
          password: credentials.password,
        }))
        return { ...data.userInfo }
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.apiToken = user.apiToken
        token.username = user.username
        token.email = user.email
        token.id = user.id
      }
      return token
    },
    async session({ token }) {
      return token
    },
  },
  session: { strategy: 'jwt' },
}
