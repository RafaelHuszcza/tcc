'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { stocksQueryKeys } from './stocks-query-keys'
import { GetStock } from './type'

export function useStocks(id: string | undefined | string[]) {
  const getStocksFn = async (): Promise<GetStock[]> => {
    const response = await apiClient.get(
      `${API_ROUTES.STOCKS}/?shelterId=${id}`,
    )

    return response.data
  }
  return useQuery({
    queryKey: stocksQueryKeys.all,
    queryFn: () => getStocksFn(),
    placeholderData: keepPreviousData,
  })
}
