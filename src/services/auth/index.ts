import { compare } from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

import { User } from '@/lib/definitions'
import { prisma } from '@/services/database'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }
      if (trigger === 'update' && (session?.name || session?.email)) {
        token.name = session.name
        token.email = session.email
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })
          if (!user) throw new Error('Invalid Credentials')

          const passwordsMatch = await compare(password, user.password)
          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            } as User
          }
        }
        return null
      },
    }),
  ],
}

export const auth = () => getServerSession(authOptions)
