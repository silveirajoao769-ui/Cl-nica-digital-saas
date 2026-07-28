import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { clinic: true, professional: true }
        });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          clinicId: user.clinicId,
          clinicSlug: user.clinic?.slug ?? null,
          professionalId: user.professional?.id ?? null
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.role = u.role;
        token.clinicId = u.clinicId;
        token.clinicSlug = u.clinicSlug;
        token.professionalId = u.professionalId;
        token.uid = u.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.uid;
      (session.user as any).role = token.role;
      (session.user as any).clinicId = token.clinicId;
      (session.user as any).clinicSlug = token.clinicSlug;
      (session.user as any).professionalId = token.professionalId;
      return session;
    }
  }
};
