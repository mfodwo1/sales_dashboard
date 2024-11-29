import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      userName: string;
      gender: string;
      dateOfBirth: string;
      picture: string;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    dateOfBirth: string;
    picture: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    dateOfBirth: string;
    picture: string;
    accessToken: string;
    refreshToken: string;
  }
}
