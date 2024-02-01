import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    }),
  ],

  secret: process.env.SECRET,
  
  callbacks: {
    async signIn({ user, account }: any): Promise<string | boolean> {  
      if(account.provider === 'google' || account.provider === 'facebook') {
        const {id, name, email} = user;
        const userId = id;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ userId });
          if(!userExists) {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                accProvider: account.provider,
                name,
                email,
              }),
            });
  
            if(res.ok) {
              return user;
            }
            console.log("User does not exist.");
          }

          else {
            console.log("User exists.");
          }
        }
          
        catch(error) {
          console.log("Error", error);
        }
      }
      return user;
    }
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
