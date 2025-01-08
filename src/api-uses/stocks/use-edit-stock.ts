'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { stocksQueryKeys } from './stocks-query-keys'
import { PutStock } from './type'

export function useEditStock() {
  const queryClient = useQueryClient()

  const editStockFn = async (updatedStock: PutStock) => {
    const { id, ...stockWithoutId } = updatedStock
    const response = await apiClient.put(
      `${API_ROUTES.STOCKS}/${id}`,
      stockWithoutId,
    )
    return response
  }

  return useMutation({
    mutationFn: editStockFn,
    onMutate: async (updatedStock) => {
      await queryClient.cancelQueries({
        queryKey: stocksQueryKeys.detail(updatedStock.id.toString()),
      })
      const previousStock = queryClient.getQueryData(
        stocksQueryKeys.detail(updatedStock.toString()),
      )
      queryClient.setQueryData(
        stocksQueryKeys.detail(updatedStock.toString()),
        updatedStock,
      )
      return { previousStock, updatedStock }
    },
    onSuccess: () => {
      toast.success('Estoque', {
        description: 'Item do estoque editado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error editing  stock', err)
      toast.error('Estoque', {
        description: 'Erro ao editar item do estoque',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: stocksQueryKeys.all })
    },
  })
}
