import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Github, Dribbble } from "lucide-react"
import porter3 from "@/components/images/porter3.png"

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <section className="max-w-3xl mx-auto mb-20">
          <div className="flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-white uppercase">OUR TRUSTED PARTNERS</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:justify-around">
              <Image
                src="https://shuffle.com/icons/logo.svg"
                alt="Partner 1"
                width={210}
                height={36}
              />
              <Image
                src="https://svgshare.com/i/1B4z.svg"
                alt="Partner 2"
                width={210}
                height={36}
              />
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center mb-5 text-2xl font-semibold text-primary">
            <Image src={porter3} alt="porterplays logo" width={48} height={36} className="mr-3" />
            porterplays
          </Link>

          <span className="block text-sm text-center text-foreground">
            © 2024 porterplays. All Rights Reserved.
          </span>

          <ul className="flex justify-center mt-5 space-x-5">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Dribbble</span>
                <Dribbble className="w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}