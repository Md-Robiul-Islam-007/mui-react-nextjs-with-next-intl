import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {auth, handlers, signIn, signOut} = NextAuth({
  session: {strategy: 'jwt'},
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Email', type: 'text', placeholder: 'admin@arsu.com'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        // local authentication logic
        /** This is just an example, the credentials are NOT verified
         *	You must do your own validation here
         */
        // *** Admin credentials are admin@arsu.com and admin
        if (
          credentials.username === 'admin@arsu.com' &&
          credentials.password === 'admin'
        ) {
          return {
            id: '1',
            email: credentials.username,
            name: 'John Doe',
            role: 'admin',
            image: 'https://i.pravatar.cc/150?img=59'
          };
        }

        return null;
      }
    }),
    GitHub,
    Google
  ],
  debug: false,
  // trustHost is true
  trustHost: true
});
