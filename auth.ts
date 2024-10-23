import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
export const { handlers, signIn, signOut, auth, session, user } = NextAuth({
  providers: [Discord],
})