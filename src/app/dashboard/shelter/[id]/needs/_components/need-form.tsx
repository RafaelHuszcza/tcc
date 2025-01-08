'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useItems } from '@/api-uses/items'
import { useCreateNeed, useEditNeed } from '@/api-uses/needs'
import { GetNeed, NeedStatus } from '@/api-uses/needs/type'
import { needSchema } from '@/app/api/needs/schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
interface NeedForm {
  method: 'POST' | 'PUT'
  defaultValues?: GetNeed
}

export type FormData = z.infer<typeof needSchema>
export function NeedForm({ method, defaultValues }: NeedForm) {
  const router = useRouter()
  const { id } = useParams()
  const { data: items } = useItems()
  const form = useForm<FormData>({
    resolver: zodResolver(needSchema),
    defaultValues: {
      itemId: defaultValues?.itemId ? defaultValues.itemId : '',
      shelterId: defaultValues?.shelterId
        ? defaultValues.shelterId
        : Array.isArray(id)
          ? id[0]
          : id,
      quantity: defaultValues?.quantity ? defaultValues.quantity : 0,
      description: defaultValues?.description ? defaultValues.description : '',
      status: defaultValues?.status ? defaultValues.status : NeedStatus.PENDING,
    },
  })

  const { handleSubmit } = form

  const createNeed = useCreateNeed()
  const editNeed = useEditNeed()
  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (method === 'PUT') {
        if (!defaultValues?.id) throw new Error('Id not found')
        const dataToSend = { ...data, id: defaultValues.id }
        await editNeed.mutateAsync(dataToSend)
        router.push(`/dashboard/shelter/${id}/needs`)
      }
      if (method === 'POST') {
        await createNeed.mutateAsync(data)
        router.push(`/dashboard/shelter/${id}/needs`)
      }
    } catch (err) {
      console.log(err)
    }
  })
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            {method === 'POST'
              ? 'Adicionar nova Necessidade'
              : 'Editar Necessidade'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-wrap justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Breve Descrição..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Item</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Item" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {items?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado da Necessidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={NeedStatus.PENDING}>
                          Pendente
                        </SelectItem>
                        <SelectItem value={NeedStatus.FULFILLED}>
                          Completo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full justify-center">
                <Button
                  type="submit"
                  className="min-w-60"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {method === 'POST'
                    ? 'Adicionar Necessidade'
                    : 'Atualizar Necessidade '}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
