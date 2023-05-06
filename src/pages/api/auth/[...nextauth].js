import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../model/User";
import dbConnect from "../../../../utils/dbConnect";
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (email == user.email && password == user.password) {
          return { id: user._id, email: user.email, name: user.name };
        } else {
          console.log("error");
          throw new Error("error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
