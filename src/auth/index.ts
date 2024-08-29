// scr/server/auth-options.ts

import NextAuth from "next-auth"

import authConfig from "./auth.config";
import User from "@/models/user"
import { connectDB } from '@/server/mongodb'
import client from "@/utils/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { ENV } from "@/utils/constants"

// Define authOptions
export const {handlers, signIn, signOut, auth} = NextAuth ({
  adapter: MongoDBAdapter(client),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }: { session: any, token: any}) {
      const { user, expires } = session;
      return {
        expires, // Keep the `expires` property
        user: {
          ...user, // Spread the existing user properties
          id: token.sub, // Include the `id` property
        },
      };
    },
  },
  events: {
    async linkAccount({user}) {
      try {
        await connectDB()

        // Update the emailVerified field with the current date
        await User.findByIdAndUpdate(user.id, {
          emailVerified: new Date(),
        })
      } catch (error) {
        ENV.IS_DEV 
          ? console.error('Error updating emailVerified field:', error)
          : console.error('Error updating emailVerified field')
      }
    }
  }
})
