import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { verifyPassword } from "./auth-utils";

export const authOptions: NextAuthConfig = {
  // Note: PrismaAdapter is commented out for credentials provider
  // adapter: PrismaAdapter(prisma) as any,
  trustHost: true, // Required for deployment behind proxies
  debug: process.env.NODE_ENV === "development", // Enable debug in development
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error(
              "Please enter both your email and password to continue."
            );
          }

          const email = credentials.email as string;
          const password = credentials.password as string;

          // Add timeout to database query
          const queryTimeout = new Promise<never>((_, reject) => {
            setTimeout(
              () => reject(new Error("Database connection timeout")),
              5000
            );
          });

          const userQuery = prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          const user = await Promise.race([userQuery, queryTimeout]);

          if (!user || !user.email) {
            throw new Error(
              "We couldn't find an account with that email address. Please check your email or sign up for a new account."
            );
          }

          // Check if user has a password set (for credentials-based auth)
          if (!user.password) {
            throw new Error(
              "This account was created using a social login (Google/GitHub). Please use that method to sign in, or reset your password to use email/password login."
            );
          }

          // Verify password
          const isValid = await verifyPassword(password, user.password);

          if (!isValid) {
            throw new Error(
              "The password you entered is incorrect. Please try again or use the 'Forgot password?' link if you need to reset it."
            );
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);

          // Handle specific errors
          if (error instanceof Error) {
            if (
              error.message.includes("timeout") ||
              error.message.includes("ETIMEDOUT")
            ) {
              throw new Error(
                "We're having trouble connecting to our servers. Please check your internet connection and try again."
              );
            }
            // Re-throw user-friendly errors
            throw error;
          }

          throw new Error(
            "An unexpected error occurred during sign in. Please try again."
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = (user as { role: "CUSTOMER" | "ADMIN" }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        (session.user as { role: "CUSTOMER" | "ADMIN" }).role = token.role as "CUSTOMER" | "ADMIN";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export auth function for server-side usage
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
