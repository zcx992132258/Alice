import { AddDataSource } from './_components/AddDataSource'
import { SearchInput } from './_components/SearchInput'
import { SourceTable } from './_components/SourceTable'

export default async function Page() {
  return (
    <div className="h-[100%]">
      <div className="flex justify-between w-[100%]">
        <SearchInput></SearchInput>
        <AddDataSource></AddDataSource>
      </div>
      <SourceTable></SourceTable>
    </div>
  )
}
