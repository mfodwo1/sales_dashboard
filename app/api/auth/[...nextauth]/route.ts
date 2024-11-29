import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            "https://rb-playground.onrender.com/internal/api/v1/auth/login/",
            {
              email: credentials?.email,
              password: credentials?.password
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const data = response.data;

          if (data.status && data.data?.user) {
            // Extract necessary user information
            const user = data.data.user;

            console.log(user);

            return user;
          } else {
            throw new Error(data.message || "Authentication failed");
          }
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid email or password");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user, 
        id: token.id as string, 
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  
  pages: {
    signIn: "/login", 
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };


