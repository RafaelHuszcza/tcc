'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { itemsQueryKeys } from './items-query-keys'
import { GetItem } from './type'

export function useItems() {
  const getItemsFn = async (): Promise<GetItem[]> => {
    const response = await apiClient.get(`${API_ROUTES.ITEMS}`)

    return response.data
  }
  return useQuery({
    queryKey: itemsQueryKeys.all,
    queryFn: () => getItemsFn(),
    placeholderData: keepPreviousData,
  })
}
