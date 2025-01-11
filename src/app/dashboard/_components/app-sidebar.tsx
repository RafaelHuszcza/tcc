'use client'

import { Building, Home, Info, Package, SendToBack, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useShelter, useShelters } from '@/api-uses/shelters'
import { GetShelter } from '@/api-uses/shelters/type'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import { NavUser } from './nav-user'

const shelterNavItems = [
  {
    title: 'Dados do Abrigo',
    icon: Info,
    href: 'edit',
    fullPath: '/dashboard/shelter/:id/edit',
  },
  {
    title: 'Necessidades',
    icon: Package,
    href: 'needs',
    fullPath: '/dashboard/shelter/:id/needs',
  },
  {
    title: 'Estoque',
    icon: SendToBack,
    href: 'stocks',
    fullPath: '/dashboard/shelter/:id/stocks',
  },
  {
    title: 'Abrigados',
    icon: Users,
    href: 'sheltereds',
    fullPath: '/dashboard/shelter/:id/sheltereds',
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(
    null,
  )
  const { data: shelters } = useShelters()
  const { data: shelter } = useShelter(selectedShelterId)

  useEffect(() => {
    const match = pathname.match(/\/dashboard\/shelter\/([a-zA-Z0-9]+)/)
    if (match) {
      setSelectedShelterId(match[1])
    } else {
      setSelectedShelterId(null)
    }
  }, [pathname])

  const isInShelterDashboard = selectedShelterId !== null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {isInShelterDashboard
                    ? `Abrigo: ${shelter?.name ? shelter.name : 'Carregando...'}`
                    : 'Meus Abrigos'}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isInShelterDashboard ? (
          <ShelterDashboardMenu shelter={shelter} />
        ) : (
          <ShelterListMenu shelters={shelters} />
        )}
      </SidebarContent>
      <SidebarFooter>
        {isInShelterDashboard && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard`}>
                  <Building className="mr-2 h-4 w-4" />
                  Voltar para Abrigos
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/`}>
                <Home className="mr-2 h-4 w-4" />
                Voltar para Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {session ? <NavUser user={session.user} /> : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function ShelterListMenu({ shelters }: { shelters?: GetShelter[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {shelters?.map((shelter) => (
            <SidebarMenuItem key={shelter.id}>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/shelter/${shelter.id}`}>
                  <Building className="mr-2 h-4 w-4" />
                  {shelter.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function ShelterDashboardMenu({ shelter }: { shelter?: GetShelter }) {
  const pathname = usePathname()
  if (!shelter) {
    return null
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu do Abrigo</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {shelterNavItems.map((item) => {
            const fullPath = item.fullPath.replace(':id', shelter.id)
            const isActive = pathname.startsWith(fullPath)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} asChild>
                  <Link href={`/dashboard/shelter/${shelter.id}/${item.href}`}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
