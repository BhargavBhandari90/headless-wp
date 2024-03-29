import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            credentials: {},

            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

              const res = await fetch(process.env.NEXT_PUBLIC_JWT_BASE + 'token', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json();

              if (user.token) {
                // Any object returned will be saved in `user` property of the JWT
                const loggeinUser = {
                  name: user.user_display_name,
                  email: user.user_email,
                  token: user.token,
                };
                return loggeinUser
              } else {
                return null;
              }
            }
        })
    ],

    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (user) {
          token.accessToken = user.token
        }
        return token;
      },

      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        if ( token ) {
          session.user.accessToken = token.accessToken
        }

        return session
      }
    },

    pages: {
      signIn: '/login',
    }

}

export default NextAuth(authOptions)