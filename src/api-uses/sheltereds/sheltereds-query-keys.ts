import { API_ROUTES } from '@/utils/constants'

export const shelteredsQueryKeys = {
  all: [API_ROUTES.SHELTEREDS],
  details: () => [...shelteredsQueryKeys.all, 'detail'],
  detail: (id: string) => [...shelteredsQueryKeys.details(), id],
}
