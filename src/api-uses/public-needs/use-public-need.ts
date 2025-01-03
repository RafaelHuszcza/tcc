'use client'
import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { publicNeedsQueryKeys } from './public-needs-query-keys'
import { PublicNeed } from './type'

export function usePublicNeed(id: string) {
  const getPublicNeedFn = async (): Promise<PublicNeed> => {
    const response = await apiClient.get(`${API_ROUTES.PUBLIC_NEEDS}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: publicNeedsQueryKeys.detail(id.toString()),
    queryFn: getPublicNeedFn,
    retry: 1,
  })
}
