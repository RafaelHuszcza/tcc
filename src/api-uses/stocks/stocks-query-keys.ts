import { API_ROUTES } from '@/utils/constants'

export const stocksQueryKeys = {
  all: [API_ROUTES.STOCKS],
  details: () => [...stocksQueryKeys.all, 'detail'],
  detail: (id: string) => [...stocksQueryKeys.details(), id],
}
