'use client'

import { ChevronsUpDown, LogOut, User } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { ProfileDialog } from '@/components/profile-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavUser({ user }: { user: Session['user'] }) {
  const { isMobile } = useSidebar()
  const [profileOpen, setProfileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const handleOpenChange = useCallback((open: boolean) => {
    setProfileOpen(open)
    if (!open) {
      setDropdownOpen(false)
    }
  }, [])

  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setDropdownOpen(open)
  }, [])

  const handleProfileClick = useCallback(() => {
    setProfileOpen(true)
    setDropdownOpen(false)
  }, [])
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu
            open={dropdownOpen}
            onOpenChange={handleDropdownOpenChange}
          >
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.image as string}
                    alt={user?.name as string}
                  />
                  <AvatarFallback className="uppercase">
                    {user?.name?.[0] ?? user?.email?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {user?.name && (
                    <span className="truncate font-semibold">{user.name}</span>
                  )}
                  {user?.email && (
                    <span className="truncate text-xs">{user.email}</span>
                  )}
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.image as string}
                      alt={user?.name as string}
                    />
                    <AvatarFallback className="rounded-lg uppercase">
                      {' '}
                      {user?.name?.[0] ?? user?.email?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleProfileClick}
              >
                <User className="mr-3 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  signOut({
                    redirect: true,
                    callbackUrl: '/auth',
                  })
                }}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <ProfileDialog
        open={profileOpen}
        onOpenChange={handleOpenChange}
        user={user}
      />
    </>
  )
}
