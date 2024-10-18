import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import hero from "@/components/images/porter2.png"
export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                PLAY WITH PORTER
              </h1>
              <p className="text-xl font-semibold text-foreground">
                and get access to the best rewards in the industry
              </p>
            </div>
            <p className="text-sm text-muted-foreground sm:text-md md:text-lg max-w-prose">
              A gambling whale that transitioned into affiliate marketing, Porter's promise is to give you the best value you can possibly get for your money. Being a player just like you, he knows exactly what you want, and will give it to you through long-established connections in the industry. Porter doesn't have a streaming or marketing deal and has never worked for a casino before, so you can be sure that everything being done for you is for YOUR benefit and not for the casino.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="https://discord.gg/qdDgW7KHyQ">Join the Discord</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden">
              <Image
                src={hero}
                alt="Hero image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}