import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, 
  },
  jwt: {
    maxAge: 2 * 60 * 60, 
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const admin = await Admin.findOne({ email: credentials.email });

          if (!admin) {
            return null;
          }

          const isPasswordValid = await admin.comparePassword(credentials.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            role: 'admin',
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin dashboard after successful login
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/admin`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
