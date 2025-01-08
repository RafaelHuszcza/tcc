'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { needsQueryKeys } from './needs-query-keys'
import { PutNeed } from './type'

export function useEditNeed() {
  const queryClient = useQueryClient()

  const editNeedFn = async (updatedNeed: PutNeed) => {
    const { id, ...needWithoutId } = updatedNeed
    const response = await apiClient.put(
      `${API_ROUTES.NEEDS}/${id}`,
      needWithoutId,
    )
    return response
  }

  return useMutation({
    mutationFn: editNeedFn,
    onMutate: async (updatedNeed) => {
      await queryClient.cancelQueries({
        queryKey: needsQueryKeys.detail(updatedNeed.id.toString()),
      })
      const previousNeed = queryClient.getQueryData(
        needsQueryKeys.detail(updatedNeed.toString()),
      )
      queryClient.setQueryData(
        needsQueryKeys.detail(updatedNeed.toString()),
        updatedNeed,
      )
      return { previousNeed, updatedNeed }
    },
    onSuccess: () => {
      toast.success('Necessidade', {
        description: 'Necessidade editada com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new need', err)
      toast.error('Necessidade', {
        description: 'Erro ao editar Necessidade',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: needsQueryKeys.all })
    },
  })
}
