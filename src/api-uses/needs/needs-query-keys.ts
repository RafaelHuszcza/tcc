import { API_ROUTES } from '@/utils/constants'

export const needsQueryKeys = {
  all: [API_ROUTES.NEEDS],
  details: () => [...needsQueryKeys.all, 'detail'],
  detail: (id: string) => [...needsQueryKeys.details(), id],
}
