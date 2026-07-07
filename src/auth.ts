import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// Auth is optional in MockSocial (only the Google sign-in button needs it).
// In development, fall back to a throwaway secret so the app runs quietly
// before OAuth is configured. Production still requires a real AUTH_SECRET —
// see INSTRUCTIONS_AUTH.md.
const isProduction = process.env.NODE_ENV === "production"

if (!process.env.AUTH_SECRET && !isProduction) {
    console.warn(
        "[auth] AUTH_SECRET is not set — using a development-only fallback. " +
        "Run `npx auth secret` and add it to .env.local (see INSTRUCTIONS_AUTH.md)."
    )
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    secret: process.env.AUTH_SECRET ?? (isProduction ? undefined : "mocksocial-dev-only-insecure-secret"),
})
