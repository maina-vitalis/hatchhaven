import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyPassword } from "./auth-utils";

export const authOptions: NextAuthConfig = {
  // Note: PrismaAdapter is commented out for credentials provider
  // adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user || !user.email) {
          throw new Error("No user found with this email");
        }

        // Check if user has a password set (for credentials-based auth)
        if (!user.password) {
          throw new Error("Please sign in with your social account or set a password");
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
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

