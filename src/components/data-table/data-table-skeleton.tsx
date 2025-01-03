import { Skeleton } from '@/components/ui/skeleton'

export function TableSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <div className="flex w-full gap-4">
        <Skeleton className="h-8 w-[150px] lg:w-[250px]" />
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-[calc(50vh+7rem)] w-full" />
    </div>
  )
}
