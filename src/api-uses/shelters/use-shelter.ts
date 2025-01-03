'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { sheltersQueryKeys } from './shelters-query-keys'
import { GetShelter } from './type'

export function useShelter(id: string | null) {
  const getShelterFn = async (): Promise<GetShelter> => {
    const response = await apiClient.get(`${API_ROUTES.SHELTERS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: sheltersQueryKeys.detail(id?.toString() || ''),
    queryFn: getShelterFn,
    retry: 1,
    enabled: !!id,
  })
}
