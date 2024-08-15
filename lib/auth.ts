import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/server/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GitHub
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'admin@test.com'
        },
        password: { label: 'Password', type: 'password', placeholder: '1234' }
      },
      async authorize(credentials, req) {

        const { username: email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email: email, password: password },
          select: {
            id: true,
            name: true,
            email: true
          }
        });
        return user;
      }
    })
  ],
  callbacks: {
    async signIn({ user }: any) {
      return user;
    },
  }
});
