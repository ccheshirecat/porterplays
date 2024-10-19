import { ClerkProvider, SignIn, SignUp } from "@clerk/nextjs";

export default function ClerkDemo() {
  return (
    <ClerkProvider>
      <SignIn />
    </ClerkProvider>
  );
}
