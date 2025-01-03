'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { sheltersQueryKeys } from './shelters-query-keys'
import { API_ROUTES } from '@/utils/constants'
export function useDeleteShelter() {
  const queryClient = useQueryClient()
  const deleteShelterFn = async (id: string) => {
    const response = await apiClient.delete(`${API_ROUTES.SHELTERS}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteShelterFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: sheltersQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir Abrigo', {
        description: 'Local excluído com sucesso',
      })
    },
    onError: (err) => {
      console.error('Error deleting shelter', err)
      queryClient.invalidateQueries({ queryKey: sheltersQueryKeys.all })
      toast.error('Erro ao excluir local', {
        description: 'Erro ao excluir local',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sheltersQueryKeys.all })
    },
  })
}
