'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { shelteredsQueryKeys } from './sheltereds-query-keys'
import { GetSheltered } from './type'

export function useSheltereds(id: string | undefined | string[]) {
  const getShelteredsFn = async (): Promise<GetSheltered[]> => {
    const response = await apiClient.get(
      `${API_ROUTES.SHELTEREDS}/?shelterId=${id}`,
    )
    return response.data
  }
  return useQuery({
    queryKey: shelteredsQueryKeys.all,
    queryFn: () => getShelteredsFn(),
    placeholderData: keepPreviousData,
    enabled: !!id,
  })
}
