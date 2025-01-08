'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { needsQueryKeys } from './needs-query-keys'
export function useDeleteNeed() {
  const queryClient = useQueryClient()
  const deleteNeedFn = async (id: string) => {
    const response = await apiClient.delete(`${API_ROUTES.NEEDS}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteNeedFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: needsQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir Necessidade', {
        description: 'Necessidade excluído com sucesso',
      })
    },
    onError: (err) => {
      console.error('Error deleting need', err)
      queryClient.invalidateQueries({ queryKey: needsQueryKeys.all })
      toast.error('Erro ao excluir Necessidade', {
        description: 'Erro ao excluir Necessidade',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: needsQueryKeys.all })
    },
  })
}
