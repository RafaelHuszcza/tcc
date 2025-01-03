import { API_ROUTES } from '@/utils/constants'

export const publicNeedsQueryKeys = {
  all: [API_ROUTES.PUBLIC_NEEDS],
  details: () => [...publicNeedsQueryKeys.all, 'detail'],
  detail: (id: string) => [...publicNeedsQueryKeys.details(), id],
}
