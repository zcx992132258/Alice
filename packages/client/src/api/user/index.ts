import { http } from '@alice/client/util/http'
import { IUser, LoginDto, RegisterDto } from '@alice/types/User'

export function apiLogin(params: LoginDto) {
  return http.post<{
    token: string
    userInfo: IUser
  }>('/user/login', params, { noAuth: true })
}

export function apiRegister(params: RegisterDto) {
  return http.post('/user/register', params, { noAuth: true })
}
