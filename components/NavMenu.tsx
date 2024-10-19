'use client'

import { CircleUser, Menu, ChevronDown, User, Settings, LogOut, Home, X } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
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
import { Separator } from "@/components/ui/separator"
import navlogo from "@/components/images/porter1.png"
import { useAuth, useSignIn, useUser } from '@clerk/nextjs'

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoaded, signOut } = useAuth()
  const { user } = useUser()
  const { signIn } = useSignIn()

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link
      href={href}
      className="font-medium flex items-center text-base transition-colors hover:text-violet-400 text-violet-100 px-2 py-2 w-full"
      prefetch={false}
      onClick={(e) => {
        setIsOpen(false);
        onClick && onClick();
      }}
    >
      {children}
    </Link>
  )

  const NavDropdown = ({ trigger, items }: { trigger: string; items: { label: string; href: string }[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-medium flex items-center text-base transition-colors hover:text-violet-400 text-violet-100 px-2 py-2">
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
    <AccordionItem value={trigger} className="border-none">
      <AccordionTrigger className="font-medium flex items-center text-base transition-colors hover:text-violet-400 text-violet-100 px-2 py-2 justify-between w-full">
        {trigger}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col pl-4">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-violet-100 hover:bg-violet-800">
          <CircleUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-violet-900 border-violet-700" align="end" forceMount>
        <DropdownMenuItem className="focus:bg-violet-800 focus:text-violet-100">
          <NavLink href="#">
            <User className="mr-2 h-4 w-4" />
            Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-violet-800 focus:text-violet-100">
          <NavLink href="#">
            <Settings className="mr-2 h-4 w-4" />
            My Account
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-violet-800 focus:text-violet-100">
          <NavLink href="#" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const handleDiscordSignIn = () => {
    if (!signIn) {
      console.error("SignIn object is not available");
      return;
    }

    signIn.authenticateWithRedirect({
      strategy: "oauth_discord",
      redirectUrl: "/",
      redirectUrlComplete: "https://porterplays.vercel.app/",
    });
  };

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
        <div className="flex justify-between h-16 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <Image width={40} height={42.69} src={navlogo} alt="logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary ml-2">porterplays</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="#">Home</NavLink>
            <NavDropdown trigger="Play" items={playItems} />
            <NavDropdown trigger="Leaderboards" items={leaderboardItems} />
            <NavLink href="#">Socials</NavLink>
            <NavLink href="#">Store</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-violet-100">Hello, {user.fullName || user.primaryEmailAddress?.emailAddress}</span>
                <UserMenu />
              </>
            ) : (
              <Button
                onClick={handleDiscordSignIn}
                className="w-full bg-violet-500 hover:bg-violet-600 text-white border-none transition-colors duration-200"
              >
                <DiscordLogoIcon className="mr-2 h-5 w-5" />
                Continue with Discord
              </Button>
            )}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-violet-100 hover:bg-violet-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-violet-950 text-violet-100">
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="icon" asChild className="text-violet-100 hover:bg-violet-800">
                  <Link href="#" onClick={() => setIsOpen(false)}>
                    <Home className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                  </Link>
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-violet-100 hover:bg-violet-800">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
              <div className="flex flex-col space-y-1">
                <Accordion type="single" collapsible className="w-full">
                  <MobileNavAccordion trigger="Play" items={playItems} />
                </Accordion>
                <Separator className="my-2 bg-[#6D27D9]" />
                <Accordion type="single" collapsible className="w-full">
                  <MobileNavAccordion trigger="Leaderboards" items={leaderboardItems} />
                </Accordion>
                <Separator className="my-2 bg-[#6D27D9]" />
                <NavLink href="#">Socials</NavLink>
                <Separator className="my-2 bg-[#6D27D9]" />
                <NavLink href="#">Store</NavLink>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <>
                    <span className="text-violet-100">Hello, {user.fullName || user.primaryEmailAddress?.emailAddress}</span>
                    <Button variant="outline" onClick={() => {}}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="outline" onClick={() => {}}>
                      <Settings className="mr-2 h-4 w-4" />
                      My Account
                    </Button>
                    <Button variant="outline" onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleDiscordSignIn}
                    className="w-full bg-violet-500 hover:bg-violet-600 text-white border-none transition-colors duration-200"
                  >
                    <DiscordLogoIcon className="mr-2 h-5 w-5" />
                    Continue with Discord
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}