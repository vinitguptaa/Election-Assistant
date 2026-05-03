import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const useMocks = process.env.NEXT_PUBLIC_ENABLE_MOCKS !== "false";

export const authOptions: NextAuthOptions = {
  adapter: useMocks ? undefined : PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET ?? "development-secret-change-me",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        if (credentials.password && credentials.password.length < 8) return null;
        const displayName = credentials.name || credentials.email.split("@")[0];

        if (useMocks) {
          return {
            id: "demo-user",
            email: credentials.email,
            name: displayName,
            role: "ADMIN"
          };
        }

        const user = await prisma.user.upsert({
          where: { email: credentials.email },
          update: {},
          create: {
            email: credentials.email,
            name: displayName
          }
        });

        await bcrypt.hash(credentials.password ?? "development-password", 10);
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};
