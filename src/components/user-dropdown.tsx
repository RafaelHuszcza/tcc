'use client'

import { LayoutDashboard, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { ProfileDialog } from './profile-dialog'
interface UserDropdownProps {
  user: Session['user']
  className?: string
}
export function UserDropdown({ user, className }: UserDropdownProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

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
      <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'relative flex h-10 items-center justify-start gap-4 rounded-md p-1 hover:bg-primary/10',
              className,
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.image as string}
                alt={user?.name as string}
              />
              <AvatarFallback className="uppercase">
                {user?.name?.[0] ?? user?.email?.[0]}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'flex flex-1 flex-col space-y-1 text-left duration-500',
              )}
            >
              {user?.name && (
                <p className="text-sm font-medium leading-none">{user.name}</p>
              )}
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[999] w-56"
          align="end"
          side={'bottom'}
          sideOffset={30}
          forceMount
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
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
            <LogOut className="mr-3 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog
        open={profileOpen}
        onOpenChange={handleOpenChange}
        user={user}
      />
    </>
  )
}
