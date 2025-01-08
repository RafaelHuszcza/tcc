import { BadgeCheck, ClockAlert } from 'lucide-react'

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
    label: 'Descrição',
    value: 'Descrição',
  },
  {
    label: 'Nome do Item',
    value: 'item.name',
  },
  {
    label: 'Abrigo',
    value: 'shelter.name',
  },
]
