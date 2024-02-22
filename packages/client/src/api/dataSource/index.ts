import { http } from '@alice/client/util/http'
import { TestLinkDto } from '@alice/types/DataSource/dto/testLink.dto'
import { SaveDataSourceDto } from '@alice/types/DataSource/dto/saveDataSource.dto'
import { EditDataSourceDto, IDataSourceList, IPreviewDataSource, RepetitionAliasNameDto, SourceListDto } from '@alice/types/DataSource'

export function apiTestLink(params: TestLinkDto) {
  return http.post<void>('/dataSource/testLink', params)
}

export function apiGetTables(params: TestLinkDto) {
  return http.post<string[]>('/dataSource/getTables', params)
}

export function apiSaveDataSource(params: SaveDataSourceDto) {
  return http.post<void>('/dataSource/saveDataSource', params)
}

export function apiGetDataSourceList(params: SourceListDto) {
  return http.post<IDataSourceList>('/dataSource/sourceList', params)
}

export function apiRepetitionAliasName(params: RepetitionAliasNameDto) {
  return http.get<boolean>('/dataSource/repetitionAliasName', params)
}

export function apiEditDataSource(params: EditDataSourceDto) {
  return http.post<void>('/dataSource/editDataSource', params)
}

export function apiPreviewDataSource(id: number) {
  return http.get<IPreviewDataSource>('/dataSource/previewDataSource', { id })
}
