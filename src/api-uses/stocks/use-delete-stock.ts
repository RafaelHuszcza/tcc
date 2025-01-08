'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { stocksQueryKeys } from './stocks-query-keys'
export function useDeleteStock() {
  const queryClient = useQueryClient()
  const deleteStockFn = async (id: string) => {
    const response = await apiClient.delete(`${API_ROUTES.STOCKS}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteStockFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: stocksQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir estoque', {
        description: 'Item excluído do estoque com sucesso',
      })
    },
    onError: (err) => {
      console.error('Error deleting stock', err)
      queryClient.invalidateQueries({ queryKey: stocksQueryKeys.all })
      toast.error('Erro ao excluir estoque', {
        description: 'Erro ao excluir item do estoque',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: stocksQueryKeys.all })
    },
  })
}
