'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { publicSheltersQueryKeys } from './public-shelters-query-keys'
import { Shelter } from './type'

export function usePublicShelter(id: string) {
  const getPublicShelterFn = async (): Promise<Shelter> => {
    const response = await apiClient.get(`${API_ROUTES.PUBLIC_SHELTERS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: publicSheltersQueryKeys.detail(id.toString()),
    queryFn: getPublicShelterFn,
    retry: 1,
  })
}
