import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from './_components/app-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
      <p
        className={
          'absolute bottom-2 right-3 text-center text-xs text-gray-400'
        }
      >
        1.0.3
      </p>
    </>
  )
}
