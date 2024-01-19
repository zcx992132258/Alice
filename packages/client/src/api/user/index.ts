import { http } from '@alice/client/util/fetch'
import { LoginDto } from '@alice/types/User'

export function apiLogin(params: LoginDto) {
  return http.post('/user/login', params)
}

export function apiRegister(params: LoginDto) {
  return http.post('/user/register', params)
}
