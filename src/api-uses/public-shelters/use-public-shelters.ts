import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'

import { publicSheltersQueryKeys } from './public-shelters-query-keys'
import { API_ROUTES } from '@/utils/constants'
import { Shelter } from './type'

export function usePublicShelters() {
  const getPublicSheltersFn = async () : Promise<Shelter[]> => {
    const response = await apiClient.get(`${API_ROUTES.PUBLIC_SHELTERS}`)

    return response.data 
  }
  return useQuery({
    queryKey: publicSheltersQueryKeys.all,
    queryFn: () => getPublicSheltersFn(),
    placeholderData: keepPreviousData,
  })
}
