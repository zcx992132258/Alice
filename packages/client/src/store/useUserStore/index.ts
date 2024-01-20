'user client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { IUser } from '@alice/types/User'
import { apiLogin } from '@alice/client/api'

interface IUserStore {
  user: IUser
  token: string
  setUser: (user: IUser) => void // 添加 setUser 方法的定义
  clearUser: () => void // 添加 clearUser 方法的定义
  login: (data: { username: string, password: string }) => Promise<void>
}

export const useUserStore = create(persist<IUserStore>((set) => {
  const login: IUserStore['login'] = async (data) => {
    const value = await apiLogin(data)
    set({
      user: value.userInfo,
      token: value.token,
    })
  }

  return {
    user: null,
    token: null,
    setUser: user => set({ user }), // 使用 setUser 方法设置 user
    setToken: (token: string) => set({ token }),
    clearUser: () => set({ user: null, token: null }), // 清除用户信息
    login,
  }
}, {
  name: 'userStore',
  storage: {
    getItem(name) {
      try {
        const data = (Cookies.get('userStore'))
        if (data?.length)
          return JSON.parse(data)[name]
        return null
      }
      catch (error) {
        console.error(error)
      }
      return null
    },
    setItem(name, value) {
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      Cookies.set('userStore', JSON.stringify({ user: value.state.user, token: value.state.token }), { expires: expirationDate })
    },
    removeItem(name) {
      const str = Cookies.get('userStore')
      if (str) {
        const data = JSON.parse(str)
        data[name] = null
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 30)
        Cookies.set('userStore', JSON.stringify(data), { expires: expirationDate })
      }
    },
  },
}))
