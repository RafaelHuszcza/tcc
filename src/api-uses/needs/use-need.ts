'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { needsQueryKeys } from './needs-query-keys'
import { GetNeedWithItemAndShelter } from './type'

export function useNeed(id: string | null) {
  const getNeedFn = async (): Promise<GetNeedWithItemAndShelter> => {
    const response = await apiClient.get(`${API_ROUTES.NEEDS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: needsQueryKeys.detail(id?.toString() || ''),
    queryFn: getNeedFn,
    retry: 1,
    enabled: !!id,
  })
}
