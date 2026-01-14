"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserAuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
         <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
         </Avatar>
         <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
            onClick={() => signOut()}
            title="Sign out"
         >
           <LogOut className="w-4 h-4" />
         </Button>
      </div>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9 rounded-xl hover:bg-secondary"
      onClick={() => signIn("google")}
      title="Sign in with Google"
    >
      <LogIn className="w-4 h-4 text-muted-foreground" />
    </Button>
  )
}
