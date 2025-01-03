import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { publicNeedsQueryKeys } from './public-needs-query-keys'
import { API_ROUTES } from '@/utils/constants'
import { PublicNeed } from './type'

export function usePublicNeeds() {
  const getPublicNeedsFn = async () : Promise<PublicNeed[]> => {
    const response = await apiClient.get(`${API_ROUTES.PUBLIC_NEEDS}`)
    return response.data 
  }
  return useQuery({
    queryKey: publicNeedsQueryKeys.all,
    queryFn: () => getPublicNeedsFn(),
    placeholderData: keepPreviousData,
  })
}
