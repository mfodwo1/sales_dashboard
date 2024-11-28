import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    email?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        try {
          const response = await axios.post(
            'https://rb-playground.onrender.com/internal/api/v1/auth/login/',
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { headers: { 'Content-Type': 'application/json' } }
          );

          const { token, email } = response.data; // Assuming your API returns a token and email.

          if (token) {
            return { accessToken: token, email }; // Return the token and email as part of the user object
          }

          return null;
        } catch (error) {
          console.error('Error during authentication', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors to the login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure a secret is set in your environment variables
};

export default NextAuth(authOptions);
