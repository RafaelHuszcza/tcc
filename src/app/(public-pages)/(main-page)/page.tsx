import dynamic from 'next/dynamic'

export default function Page() {
  const DynamicMap = dynamic(() => import('./_components/maps'), {
    ssr: false,
  })
  return (
    <main className="h-[calc(100vh-5rem)] w-full">
      <DynamicMap />
    </main>
  )
}
