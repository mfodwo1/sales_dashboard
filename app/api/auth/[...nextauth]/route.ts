import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://rb-playground.onrender.com/internal/api/v1/auth/login/",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const data = response.data;

          if (data.status && data.data?.user) {
            const apiUser = data.data.user;
            const tokens = {
              accessToken: data.data.access,
              refreshToken: data.data.refresh,
            };

            // Return a clean and structured user object
            return {
              id: apiUser.id,
              email: apiUser.email,
              firstName: apiUser.profile.first_name,
              lastName: apiUser.profile.last_name,
              userName: apiUser.profile.user_name,
              gender: apiUser.profile.gender,
              dateOfBirth: apiUser.profile.date_of_birth,
              picture: apiUser.profile.picture,
              ...tokens,
            };
          } else {
            throw new Error(data.message || "Authentication failed");
          }
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
        userName: token.userName,
        gender: token.gender,
        dateOfBirth: token.dateOfBirth,
        picture: token.picture,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to a custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
