'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useCreateShelter, useEditShelter } from '@/api-uses/shelters'
import { GetShelter, ShelterStatus } from '@/api-uses/shelters/type'
import { shelterSchema } from '@/app/api/shelters/schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
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
interface ShelterForm {
  method: 'POST' | 'PUT'
  defaultValues?: GetShelter
}

export type FormData = z.infer<typeof shelterSchema>
export function ShelterForm({ method, defaultValues }: ShelterForm) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(shelterSchema),
    defaultValues: {
      id: defaultValues?.id ? defaultValues.id : '',
      name: defaultValues?.name ? defaultValues.name : '',
      lat: defaultValues?.lat ? defaultValues.lat : 0,
      lng: defaultValues?.lng ? defaultValues.lng : 0,
      address: defaultValues?.address ? defaultValues.address : '',
      capacity: defaultValues?.capacity ? defaultValues.capacity : 0,
      currentOccupancy: defaultValues?.currentOccupancy
        ? defaultValues.currentOccupancy
        : 0,
      description: defaultValues?.description ? defaultValues.description : '',
      phone: defaultValues?.phone ? defaultValues.phone : '',
      serviceHours: defaultValues?.serviceHours
        ? defaultValues.serviceHours
        : '',
      status: defaultValues?.status
        ? defaultValues.status
        : ShelterStatus.ACTIVE,
      whatsApp: defaultValues?.whatsApp ? defaultValues.whatsApp : '',
    },
  })

  const { handleSubmit } = form

  const createShelter = useCreateShelter()
  const editShelter = useEditShelter()
  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (method === 'PUT') {
        await editShelter.mutateAsync(data)
        router.push(`/dashboard/${data.id}`)
      }
      if (method === 'POST') {
        const response = await createShelter.mutateAsync(data)
        router.push(`/dashboard/shelter/${response.id}/edit`)
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
            {method === 'POST' ? 'Adicionar novo Abrigo' : 'Editar Abrigo'}
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
                name="name"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Abrigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => (
                    <FormItem className="min-w-60">
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lng"
                  render={({ field }) => (
                    <FormItem className="min-w-60">
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="min-w-60">
                      <FormLabel>Capacidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
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
                  name="currentOccupancy"
                  render={({ field }) => (
                    <FormItem className="min-w-60">
                      <FormLabel>Ocupação atual</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
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
              </div>
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Formato: 5553999999999</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceHours"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Horário de funcionamento </FormLabel>
                    <FormControl>
                      <Input placeholder="24h" {...field} />
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
                          <SelectValue placeholder="Selecione o estado do abrigo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ShelterStatus.ACTIVE}>
                          Ativo
                        </SelectItem>
                        <SelectItem value={ShelterStatus.INACTIVE}>
                          Inativo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsApp"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do WhatsApp" {...field} />
                    </FormControl>
                    <FormDescription>Formato: 5553999999999</FormDescription>
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
                  {method === 'POST' ? 'Adicionar Abrigo' : 'Atualizar abrigo '}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
