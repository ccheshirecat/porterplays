import { signInWithDiscord } from "@/auth"
import { Button } from "@/components/ui/button"
import { DiscordLogoIcon } from "@radix-ui/react-icons"

export default function SignIn() {
  return (
    <form action={signInWithDiscord}>
      <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white border-none transition-colors duration-200">
        <DiscordLogoIcon className="mr-2 h-5 w-5" />
        Continue with Discord
      </Button>
    </form>
  )
} 
