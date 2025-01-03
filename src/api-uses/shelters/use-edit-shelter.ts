'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { sheltersQueryKeys } from './shelters-query-keys'
import { PutShelter } from './type'

export function useEditShelter() {
  const queryClient = useQueryClient()

  const editShelterFn = async (updatedShelter: PutShelter) => {
    const { id, ...shelterWithoutId } = updatedShelter
    const response = await apiClient.put(
      `${API_ROUTES.SHELTERS}/${id}`,
      shelterWithoutId,
    )
    return response
  }

  return useMutation({
    mutationFn: editShelterFn,
    onMutate: async (updatedShelter) => {
      await queryClient.cancelQueries({
        queryKey: sheltersQueryKeys.detail(updatedShelter.id.toString()),
      })
      const previousShelter = queryClient.getQueryData(
        sheltersQueryKeys.detail(updatedShelter.toString()),
      )
      queryClient.setQueryData(
        sheltersQueryKeys.detail(updatedShelter.toString()),
        updatedShelter,
      )
      return { previousShelter, updatedShelter }
    },
    onSuccess: () => {
      toast.success('Abrigo', {
        description: 'Abrigo editada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new shelter', err)
      toast.error('Abrigo', {
        description: 'Erro ao editar Abrigo',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sheltersQueryKeys.all })
    },
  })
}
