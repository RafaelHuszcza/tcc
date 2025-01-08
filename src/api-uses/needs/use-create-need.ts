'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { needsQueryKeys } from './needs-query-keys'
import { PostNeed } from './type'

const createNeedFn = async (newNeed: Partial<PostNeed>) => {
  const response = await apiClient.post(`${API_ROUTES.NEEDS}`, newNeed)
  return response.data
}

export function useCreateNeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNeedFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: needsQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Necessidade', {
        description: 'Necessidade criado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new need', err)
      toast.error('Necessidade', {
        description: 'Erro ao criar Necessidade',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: needsQueryKeys.all })
    },
  })
}
