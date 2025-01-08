'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { shelteredsQueryKeys } from './sheltereds-query-keys'
import { PutSheltered } from './type'

export function useEditSheltered() {
  const queryClient = useQueryClient()

  const editShelteredFn = async (updatedSheltered: PutSheltered) => {
    const { id, ...shelteredWithoutId } = updatedSheltered
    const response = await apiClient.put(
      `${API_ROUTES.SHELTEREDS}/${id}`,
      shelteredWithoutId,
    )
    return response
  }

  return useMutation({
    mutationFn: editShelteredFn,
    onMutate: async (updatedSheltered) => {
      await queryClient.cancelQueries({
        queryKey: shelteredsQueryKeys.detail(updatedSheltered.id.toString()),
      })
      const previousSheltered = queryClient.getQueryData(
        shelteredsQueryKeys.detail(updatedSheltered.toString()),
      )
      queryClient.setQueryData(
        shelteredsQueryKeys.detail(updatedSheltered.toString()),
        updatedSheltered,
      )
      return { previousSheltered, updatedSheltered }
    },
    onSuccess: () => {
      toast.success('Abrigado(a)', {
        description: 'Abrigado(a) editado(a) com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new sheltered', err)
      toast.error('Abrigado(a)', {
        description: 'Erro ao editar Abrigado(a)',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shelteredsQueryKeys.all })
    },
  })
}
