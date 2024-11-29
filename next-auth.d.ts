// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
      profile: {
                first_name: string 
                last_name: string 
                user_name: string 
                gender: string 
                date_of_birth: string 
                picture: string
            }
    };
  }

  interface JWT {
    id: string;
    accessToken: string;
  }
}
