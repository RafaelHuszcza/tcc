'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useItems } from '@/api-uses/items'
import { useCreateStock, useEditStock } from '@/api-uses/stocks'
import { GetStock } from '@/api-uses/stocks/type'
import { stockSchema } from '@/app/api/stocks/schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
interface StockForm {
  method: 'POST' | 'PUT'
  defaultValues?: GetStock
}

export type FormData = z.infer<typeof stockSchema>
export function StockForm({ method, defaultValues }: StockForm) {
  const router = useRouter()
  const { id } = useParams()
  const { data: items } = useItems()
  const form = useForm<FormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      itemId: defaultValues?.itemId ? defaultValues.itemId : '',
      shelterId: defaultValues?.shelterId
        ? defaultValues.shelterId
        : Array.isArray(id)
          ? id[0]
          : id,
      quantity: defaultValues?.quantity ? defaultValues.quantity : 0,
      expirationDate: defaultValues?.expirationDate
        ? defaultValues.expirationDate
        : new Date(),
    },
  })

  const { handleSubmit } = form

  const createStock = useCreateStock()
  const editStock = useEditStock()
  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (method === 'PUT') {
        if (!defaultValues?.id) throw new Error('Id not found')
        const dataToSend = { ...data, id: defaultValues.id }
        await editStock.mutateAsync(dataToSend)
        router.push(`/dashboard/shelter/${id}/stocks`)
      }
      if (method === 'POST') {
        console.log(data)
        await createStock.mutateAsync(data)
        router.push(`/dashboard/shelter/${id}/stocks`)
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
              ? 'Adicionar Item ao Estoque'
              : 'Editar Item do Estoque'}
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
                name="expirationDate"
                render={({ field }) => (
                  <FormItem className="flex min-w-60 flex-col gap-2">
                    <FormLabel>Data de Validade</FormLabel>
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

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
                    ? 'Adicionar Item ao estoque'
                    : 'Atualizar Item do estoque '}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
