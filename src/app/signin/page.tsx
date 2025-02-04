import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Signin() {
  return (
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
            
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </body>
      </html>
  );
}
