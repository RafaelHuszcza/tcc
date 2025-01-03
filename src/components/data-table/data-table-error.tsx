import { Card, CardHeader, CardTitle } from '../ui/card'

export function ErrorTable() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-[350px] bg-destructive">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Error ao obter dados
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
