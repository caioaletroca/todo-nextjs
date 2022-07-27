import NextAuth, { NextAuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    maxAge: 60 * 60 * 24
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // console.log('session', session, token, user);
      if(session.user) {
        // session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ user, token }) {
      // console.log('jwt', user, token);
      return token;
    }
  }
}

export default NextAuth(authOptions)