'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { shelteredsQueryKeys } from './sheltereds-query-keys'
import { GetSheltered } from './type'

export function useSheltered(id: string | null) {
  const getShelteredFn = async (): Promise<GetSheltered> => {
    const response = await apiClient.get(`${API_ROUTES.SHELTEREDS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: shelteredsQueryKeys.detail(id?.toString() || ''),
    queryFn: getShelteredFn,
    retry: 1,
    enabled: !!id,
  })
}
