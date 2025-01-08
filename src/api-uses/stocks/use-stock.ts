'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { stocksQueryKeys } from './stocks-query-keys'
import { GetStock } from './type'

export function useStock(id: string | null) {
  const getStockFn = async (): Promise<GetStock> => {
    const response = await apiClient.get(`${API_ROUTES.STOCKS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: stocksQueryKeys.detail(id?.toString() || ''),
    queryFn: getStockFn,
    retry: 1,
    enabled: !!id,
  })
}
