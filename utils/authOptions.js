import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful signin

    async signIn({ profile }) {
      // connect to database
      await connectDB();

      // check if user exists
      const userExist = await User.findOne({ email: profile.email });
      // if not, add user to database
      if (!userExist) {
        // truncate username if too long
        const username = profile.name.slice();

        await User.create({
          email: profile.email,
          username,
          image: profile.image,
        });
      }

      // return true to allow the sign in
      return true;
    },
    // modify the session obj

    async session({ session }) {
      // get user from database
      const user = await User.findOne({ email: session.user.email });
      // assign the user id to the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
