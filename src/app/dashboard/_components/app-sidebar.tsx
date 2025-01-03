"use client"

import Link from "next/link"
import {  Users, Package, Building, Info, Home, SendToBack } from 'lucide-react'

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
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { NavUser } from "./nav-user"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useShelter, useShelters } from "@/api-uses/shelters"
import { GetShelter } from "@/api-uses/shelters/type"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const shelterNavItems = [
  { title: "Dados do Abrigo", icon: Info, href: "edit" },
  { title: "Necessidades", icon: Package, href: "needs" },
  { title: "Estoque", icon: SendToBack, href: "stock" },
  { title: "Abrigados", icon: Users, href: "sheltered" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname(); 
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null)

  const {data: shelters} = useShelters()
  const {data: shelter} = useShelter(selectedShelterId)

  useEffect(() => {
    const match = pathname.match(/\/dashboard\/shelter\/([a-zA-Z0-9]+)/);
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
          <span className="truncate font-semibold ">
            {isInShelterDashboard ? `Abrigo: ${shelter?.name}` : 'Meus Abrigos'}
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
          <ShelterListMenu shelters={shelters}/>
        )}
      </SidebarContent>
      <SidebarFooter>
        {isInShelterDashboard && (
      <SidebarMenu>
          <SidebarMenuItem >
              <SidebarMenuButton  asChild>
                <Link href={`/dashboard`}>
                  <Building className="mr-2 h-4 w-4" />
                  Voltar para Abrigos
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        )}
      <SidebarMenu>
          <SidebarMenuItem >
              <SidebarMenuButton  asChild>
                <Link href={`/`}>
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      
  

      <NavUser user={session?.user}  />
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
              <SidebarMenuButton  asChild>
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
  if (!shelter) {
    return null
  }
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu do Abrigo</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {shelterNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={pathname.split("/").at(-1) == item.href} asChild>
                <Link href={`/dashboard/shelter/${shelter.id}/${item.href}`}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    
   
  )
}
