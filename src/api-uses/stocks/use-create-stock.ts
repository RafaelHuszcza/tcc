'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { stocksQueryKeys } from './stocks-query-keys'
import { PostStock } from './type'

const createStockFn = async (newStock: Partial<PostStock>) => {
  const response = await apiClient.post(`${API_ROUTES.STOCKS}`, newStock)
  return response.data
}

export function useCreateStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStockFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: stocksQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Estoque', {
        description: 'Item adicionado ao estoque com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new stock', err)
      toast.error('Estoque', {
        description: 'Erro ao adicionar item no estoque',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: stocksQueryKeys.all })
    },
  })
}
