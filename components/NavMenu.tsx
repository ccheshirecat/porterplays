'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import navlogo from "@/components/images/porter1.png"
import SignInPopup from "@/components/sign-in-popup"
import SignUpPopup from "@/components/sign-up-popup"

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="font-medium flex items-center text-sm transition-colors hover:text-violet-400 text-violet-100"
      prefetch={false}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )

  const NavDropdown = ({ trigger, items }: { trigger: string; items: { label: string; href: string }[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-medium flex items-center text-sm transition-colors hover:text-violet-400 text-violet-100">
        {trigger} <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-violet-900 border-violet-700">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} className="focus:bg-violet-800 focus:text-violet-100">
            <NavLink href={item.href}>{item.label}</NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const MobileNavAccordion = ({ trigger, items }: { trigger: string; items: { label: string; href: string }[] }) => (
    <AccordionItem value={trigger} className="border-violet-700">
      <AccordionTrigger className="text-violet-100 hover:text-violet-400">{trigger}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col space-y-2">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )

  const playItems = [
    { label: "PlayShuffle", href: "#playshuffle" },
    { label: "PlayGoated", href: "#playgoated" },
  ]

  const leaderboardItems = [
    { label: "Shuffle", href: "#shuffle-leaderboard" },
    { label: "Goated", href: "#goated-leaderboard" },
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-background shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <Image width={40} height={42.69} src={navlogo} alt="logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">porterplays</span>
          </Link>
          <div className="hidden md:flex gap-4 text-sm font-medium space-x-2">
            <NavLink href="#">Home</NavLink>
            <NavDropdown trigger="Play" items={playItems} />
            <NavDropdown trigger="Leaderboards" items={leaderboardItems} />
            <NavLink href="#">Socials</NavLink>
            <NavLink href="#">Store</NavLink>
          </div>
          <div className="hidden md:flex space-x-4">
            <SignInPopup />
            <SignUpPopup />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-violet-100 hover:bg-violet-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-violet-950 text-violet-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="home" className="border-violet-700">
                  <AccordionTrigger className="text-violet-100 hover:text-violet-400">
                    <NavLink href="#">Home</NavLink>
                  </AccordionTrigger>
                </AccordionItem>
                <MobileNavAccordion trigger="Play" items={playItems} />
                <MobileNavAccordion trigger="Leaderboards" items={leaderboardItems} />
                <AccordionItem value="socials" className="border-violet-700">
                  <AccordionTrigger className="text-violet-100 hover:text-violet-400">
                    <NavLink href="#">Socials</NavLink>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="store" className="border-violet-700">
                  <AccordionTrigger className="text-violet-100 hover:text-violet-400">
                    <NavLink href="#">Store</NavLink>
                  </AccordionTrigger>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-col gap-2 mt-4 md:hidden">
                <SignInPopup />
                <SignUpPopup />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}