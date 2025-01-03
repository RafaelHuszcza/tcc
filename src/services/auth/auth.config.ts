import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user,trigger, session }) {
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
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (isOnAuth){
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
        return true
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
