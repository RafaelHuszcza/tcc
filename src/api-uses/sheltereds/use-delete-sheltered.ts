'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { shelteredsQueryKeys } from './sheltereds-query-keys'
export function useDeleteSheltered() {
  const queryClient = useQueryClient()
  const deleteShelteredFn = async (id: string) => {
    const response = await apiClient.delete(`${API_ROUTES.SHELTEREDS}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteShelteredFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: shelteredsQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir Abrigado(a)', {
        description: 'Abrigado(a) excluído(a) com sucesso',
      })
    },
    onError: (err) => {
      console.error('Error deleting sheltered', err)
      queryClient.invalidateQueries({ queryKey: shelteredsQueryKeys.all })
      toast.error('Erro ao excluir Abrigado(a)', {
        description: 'Erro ao excluir Abrigado(a)',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shelteredsQueryKeys.all })
    },
  })
}
