'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useCreateSheltered, useEditSheltered } from '@/api-uses/sheltereds'
import { GetSheltered } from '@/api-uses/sheltereds/type'
import { shelteredSchema } from '@/app/api/sheltereds/schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
interface ShelteredForm {
  method: 'POST' | 'PUT'
  defaultValues?: GetSheltered
}

export type FormData = z.infer<typeof shelteredSchema>
export function ShelteredForm({ method, defaultValues }: ShelteredForm) {
  const [exited, setExited] = useState(false)
  const router = useRouter()
  const { id } = useParams()
  const form = useForm<FormData>({
    resolver: zodResolver(shelteredSchema),
    defaultValues: {
      name: defaultValues?.name ? defaultValues.name : '',
      age: defaultValues?.age ? defaultValues.age : 0,
      sex: defaultValues?.sex ? defaultValues.sex : '',
      entryDate: defaultValues?.entryDate
        ? defaultValues.entryDate
        : new Date(),
      exitDate: defaultValues?.exitDate ? defaultValues.exitDate : new Date(),
      shelterId: defaultValues?.shelterId
        ? defaultValues.shelterId
        : Array.isArray(id)
          ? id[0]
          : id,
    },
  })

  const { handleSubmit } = form

  const createSheltered = useCreateSheltered()
  const editSheltered = useEditSheltered()
  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (!exited) {
        data.exitDate = undefined
      }
      if (method === 'PUT') {
        if (!defaultValues?.id) throw new Error('Id not found')
        const dataToSend = { ...data, id: defaultValues.id }
        await editSheltered.mutateAsync(dataToSend)
        router.push(`/dashboard/shelter/${id}/sheltereds`)
      }
      if (method === 'POST') {
        console.log(data)
        await createSheltered.mutateAsync(data)
        router.push(`/dashboard/shelter/${id}/sheltereds`)
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
            {method === 'POST' ? 'Adicionar Abrigado' : 'Editar Abrigado'}
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rafael Machado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={150}
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
                name="sex"
                render={({ field }) => (
                  <FormItem className="min-w-60">
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Input placeholder="Cis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exited"
                  checked={exited}
                  onCheckedChange={(e) => setExited(e === true)}
                />
                <label
                  htmlFor="exited"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Esse usuário já saiu do abrigo?
                </label>
              </div>
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem className="flex min-w-60 flex-col gap-2">
                    <FormLabel>Data de Entrada</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'min-w-60 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ptBR}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {exited && (
                <FormField
                  control={form.control}
                  name="exitDate"
                  render={({ field }) => (
                    <FormItem className="flex min-w-60 flex-col gap-2">
                      <FormLabel>Data de Saida</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'min-w-60 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP', { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={ptBR}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                    ? 'Adicionar Abrigado'
                    : 'Atualizar Abrigado'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
