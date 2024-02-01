import { http } from '@alice/client/util/http'
import { TestLinkDto } from '@alice/types/DataSource/dto/testLink.dto'

export function apiTestLink(params: TestLinkDto) {
  return http.post('/dataSource/testLink', params)
}
