import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      accessToken: string;
      access: string;
      refresh:string;
      profile: {
        first_name: string;
        last_name: string;
        user_name: string;
        gender: string;
        date_of_birth: string;
        picture: string;
      };
    };
  }

  interface User {
    id: string;
    email: string;
    accessToken: string;
    access: string;
    refresh:string;
    profile: {
      first_name: string;
      last_name: string;
      user_name: string;
      gender: string;
      date_of_birth: string;
      picture: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    accessToken: string;
    access: string;
    refresh:string;
    profile: {
      first_name: string;
      last_name: string;
      user_name: string;
      gender: string;
      date_of_birth: string;
      picture: string;
    };
  }
}
