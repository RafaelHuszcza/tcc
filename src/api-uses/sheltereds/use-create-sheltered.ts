'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { shelteredsQueryKeys } from './sheltereds-query-keys'
import { PostSheltered } from './type'

const createShelteredFn = async (newSheltered: Partial<PostSheltered>) => {
  const response = await apiClient.post(
    `${API_ROUTES.SHELTEREDS}`,
    newSheltered,
  )
  return response.data
}

export function useCreateSheltered() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShelteredFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: shelteredsQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Abrigado(a)', {
        description: 'Abrigado(a) criado(a) com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new sheltered', err)
      toast.error('Abrigado(a)', {
        description: 'Erro ao criar Abrigado(a)',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: shelteredsQueryKeys.all })
    },
  })
}
