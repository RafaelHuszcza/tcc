'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { sheltersQueryKeys } from './shelters-query-keys'
import { GetShelter } from './type'

export function useShelters() {
  const getSheltersFn = async (): Promise<GetShelter[]> => {
    const response = await apiClient.get(`${API_ROUTES.SHELTERS}`)

    return response.data
  }
  return useQuery({
    queryKey: sheltersQueryKeys.all,
    queryFn: () => getSheltersFn(),
    placeholderData: keepPreviousData,
  })
}
