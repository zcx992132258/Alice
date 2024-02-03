import { apiGetDataSourceList } from '@alice/client/api/dataSource'
import { AddDataSource } from './_components/AddDataSource'

export default async function Page() {
  return (
    <div className="h-[100%] ">
      <div className="flex justify-end w-[100%]">
        <AddDataSource></AddDataSource>
      </div>
    </div>
  )
}
