'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '@/utils/constants'

import { apiClient } from '../api-client'
import { sheltersQueryKeys } from './shelters-query-keys'
import { PostShelter } from './type'

const createShelterFn = async (newShelter: Partial<PostShelter>) => {
  const response = await apiClient.post(`${API_ROUTES.SHELTERS}`, newShelter)
  return response.data
}

export function useCreateShelter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShelterFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: sheltersQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Abrigo', {
        description: 'Abrigo criado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: unknown) => {
      console.error('Error creating new shelter', err)
      toast.error('Abrigo', {
        description: 'Erro ao criar abrigo',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sheltersQueryKeys.all })
    },
  })
}
