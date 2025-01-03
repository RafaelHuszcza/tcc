'use client'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { UserDropdown } from './user-dropdown'

export function Header() {
  const { data: session } = useSession()
  const navigation = [{ name: 'Necessidades', href: '/needs' }]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  const isActive = (path: string) => {
    return pathname === path
  }
  return (
    <header className="h-20 border-b-[1px] bg-background">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Button variant="default" className={cn('p-6')}>
            <Link href="/">
              <h1 className="text-xl font-bold">Abrigos RG</h1>
            </Link>
          </Button>
        </div>
        <div className="flex gap-3 lg:hidden">
          <ModeToggle />
          <Button
            type="button"
            variant="ghost"
            className="hover:text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            return (
              <Button
                className={cn(
                  'text-lg',
                  isActive(item.href) && 'underline hover:text-primary/80',
                )}
                key={item.name}
                variant="link"
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-5">
          <ModeToggle />
          {session?.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <Button
              variant="ghost"
              className={cn(
                'text-lg text-foreground hover:bg-primary hover:text-background dark:text-foreground dark:hover:text-foreground',
                isActive('/auth') &&
                  'bg-primary text-primary-foreground hover:bg-primary/70',
              )}
              asChild
            >
              <Link href={'/auth'}>Entrar</Link>
            </Button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="z-50 lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Button variant="default" className={cn('p-6')}>
              <Link href="/">
                <h1 className="text-xl font-bold">Abrigos RG</h1>
              </Link>
            </Button>
            <div className="flex gap-4">
              <ModeToggle />
              <Button
                type="button"
                variant="ghost"
                className="hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fechar</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-foreground/10">
              <div className="flex flex-col items-start gap-2 py-6">
                {navigation.map((item) => {
                  return (
                    <Button
                      className={cn(
                        'text-lg',
                        isActive(item.href) &&
                          'underline hover:text-primary/80',
                      )}
                      key={item.name}
                      variant="link"
                      asChild
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  )
                })}
              </div>
              <div className="py-6">
                {session?.user ? (
                  <UserDropdown user={session.user} />
                ) : (
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full text-lg text-background hover:bg-primary hover:text-background dark:text-foreground dark:hover:text-foreground',
                      isActive('/auth') && 'bg-primary hover:bg-primary/70',
                    )}
                    asChild
                  >
                    <Link href={'/auth'}>Entrar</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
