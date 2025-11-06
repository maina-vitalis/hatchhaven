import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// NextAuth v5 returns handlers object
const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;

