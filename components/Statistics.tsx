import { Card, CardContent } from "@/components/ui/card"

interface StatProps {
  value: string
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-4 text-center">
        <h3 className="text-4xl font-bold text-primary lg:text-5xl xl:text-6xl">{value}</h3>
        <p className="mt-2 text-sm font-medium tracking-widest text-muted-foreground uppercase lg:text-base">
          {label}
        </p>
      </CardContent>
    </Card>
  )
}

export default function StatisticsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="1000+" label="members" />
          <Stat value="250k+" label="in rewards given" />
          <Stat value="3" label="partner casinos" />
          <Stat value="#1" label="most rewarding affiliate" />
        </div>
      </div>
    </section>
  )
}