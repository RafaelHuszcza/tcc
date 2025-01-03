import { compare } from "bcryptjs";
import NextAuth ,{ CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from '@/services/database'
import { z } from 'zod';
import { User } from '@/lib/definitions'
import { authConfig } from '@/services/auth/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail",  type: "email"  },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          })
          if (!user)  throw new CredentialsSignin("Invalid Credentials")
        
          const passwordsMatch = await compare(password, user.password);
          if (passwordsMatch) {
            return {
            id: user.id,
            email: user.email,
            name: user.name,
          } as User;
        }
        }
        return null
      },
    }),
  ],
})
