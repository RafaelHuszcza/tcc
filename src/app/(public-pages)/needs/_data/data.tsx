import {
  BadgeCheck,
  ClockAlert
} from 'lucide-react'

export const statuses = [
  {
    value: 'PENDING',
    label: 'Pendente',
    icon: ClockAlert,
  },
  {
    value: 'FULFILLED',
    label: 'Cumprido',
    icon: BadgeCheck,
  },
]

export const filters = [
  {
    label: 'Nome do Item',
    value: 'item.name',
  },
  {
    label: 'Descrição',
    value: 'Descrição',
  },
  {
    label: 'Abrigo',
    value: 'shelter.name',
  },
  {
    label: 'Data de criação',
    value: 'createdAt',
  }
]
