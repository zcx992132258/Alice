import { http } from '@alice/client/util/http'
import { IUser, LoginDto, PreRegisterDto, RegisterDto } from '@alice/types/User'

export function apiLogin(params: LoginDto) {
  return http.post<{
    token: string
    userInfo: IUser
  }>('/user/login', params, { noAuth: true })
}

export function apiPreRegisterDto(params: PreRegisterDto) {
  return http.post('/user/PreRegisterDto', params, { noAuth: true })
}

export function apiRegister(params: RegisterDto) {
  return http.post<PreRegisterDto>('/user/register', params, { noAuth: true })
}
