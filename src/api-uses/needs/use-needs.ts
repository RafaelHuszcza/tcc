'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { needsQueryKeys } from './needs-query-keys'
import { GetNeed } from './type'

export function useNeeds(id: string | undefined | string[]) {
  const getNeedsFn = async (): Promise<GetNeed[]> => {
    const response = await apiClient.get(`${API_ROUTES.NEEDS}/?shelterId=${id}`)

    return response.data
  }
  return useQuery({
    queryKey: needsQueryKeys.all,
    queryFn: () => getNeedsFn(),
    placeholderData: keepPreviousData,
    enabled: !!id,
  })
}
