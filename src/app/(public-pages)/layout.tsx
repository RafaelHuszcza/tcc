import { Header } from "@/components/header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen w-full flex-col">
    <Header />
    {children}
    </div>
  )
}
