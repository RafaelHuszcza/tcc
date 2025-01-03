'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { PasswordInput } from './password-input'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: Session['user']
}
export function ProfileDialog({
  open,
  onOpenChange,
  user,
}: ProfileDialogProps) {
  const { update } = useSession()
  const formSchema = z
    .object({
      name: z
        .string({ required_error: 'Nome é requerido' })
        .min(3, 'O Nome deve conter mais de 3 caracteres'),
      email: z
        .string({ required_error: 'Email é requerido' })
        .email('Email Inválido'),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    })
    .refine(
      (data) => {
        if (data?.password === '') {
          return true
        }
        if (!data?.password) {
          return true
        }
        return (
          data?.password?.length >= 6 &&
          /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data?.password)
        )
      },
      {
        message:
          'A senha precisa ter no mínimo 6 caracteres e conter pelo menos 1 caractere especial e 1 número',
        path: ['password'],
      },
    )
    .transform((data) => {
      if (data.password === undefined) delete data.password
      delete data.confirmPassword
      return data
    })

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      confirmPassword: '',
    },
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (data: FormData) => {
    const response = await fetch(`/api/users/${user?.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    })
    const jsonResponse = await response.json()
    if (response.status !== 200) {
      toast.error('Atualização', {
        description: jsonResponse?.message,
      })
    } else {
      toast.success('Atualização', {
        description: 'Atualização realizada com sucesso',
      })
      update({ name: data.name, email: data.email })
      onOpenChange(false)
    }
  })

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        form.reset()
      }
      onOpenChange(newOpen)
    },
    [form, onOpenChange],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex w-auto flex-col rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center">Editar Perfil</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput className="px-3 py-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <PasswordInput className="px-3 py-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Editar Usuário'
                )}
              </Button>
              <Button
                disabled={isSubmitting}
                variant="destructive"
                type="button"
                className="w-full"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
