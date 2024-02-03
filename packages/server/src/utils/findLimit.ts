import { FindManyOptions, Repository } from 'typeorm'

export async function findLimit<T>(params: { page: number, size: number }, repository: Repository<T>, query?: FindManyOptions<T>) {
  const [data, total] = await repository.findAndCount({
    skip: (params.page - 1) * params.size,
    take: params.size,
    ...query || {},
  })

  const hasNextPage = params.page + 1 * params.size < total

  return {
    list: data,
    total,
    page: params.page,
    size: params.size,
    hasNextPage,
  }
}
