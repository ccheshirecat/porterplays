'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { CircleUser, Menu, ChevronDown, User, Settings, LogOut, Home, X } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import navlogo from "@/components/images/porter3.png"
import SignIn from "@/components/sign-in"

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession(); // session contains user details if logged in, status shows if session is loading
  const user = session?.user; // session.user gives you the authenticated user object
  
  // signIn and signOut are directly available from next-auth

  const mobileMenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

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
  const playItems = [
    { label: "PlayShuffle", href: "/play/shuffle" },
    { label: "PlayGoated", href: "/play/goated" },
  ]

  const leaderboardItems = [
    { label: "Shuffle", href: "/leaderboards/shuffle" },
    { label: "Goated", href: "/leaderboards/goated" },
  ]

  return (
    <motion.nav className="fixed inset-x-0 top-0 z-50 bg-background shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <Image width={40} height={42.69} src={navlogo} alt="logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary ml-2">porterplays</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavDropdown trigger="Play" items={playItems} />
            <NavDropdown trigger="Leaderboards" items={leaderboardItems} />
            <NavLink href="/socials">Socials</NavLink>
            <NavLink href="/store">Store</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-violet-100">Hello, {user?.name || user?.email}</span>
                <UserMenu />
              </>
            ) : (
              <SignIn />
            )}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-violet-100 hover:bg-violet-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <AnimatePresence>
              {isOpen && (
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[400px] bg-violet-950 text-violet-100 p-0"
                  forceMount
                >
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={mobileMenuVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <Button variant="ghost" size="icon" asChild className="text-violet-100 hover:bg-violet-800">
                        <Link href="/" onClick={() => setIsOpen(false)}>
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
                      <NavLink href="/socials">Socials</NavLink>
                      <Separator className="my-2 bg-[#6D27D9]" />
                      <NavLink href="/store">Store</NavLink>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {user ? (
                        <>
                          <span className="text-violet-100">Hello, {user?.name || user?.email}</span>
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
                        <SignIn />
                      )}
                    </div>
                  </motion.div>
                </SheetContent>
              )}
            </AnimatePresence>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}
