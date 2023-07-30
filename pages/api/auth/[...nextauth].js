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
                  accessToken: user.token,
                };

                console.log('loggeinUser',loggeinUser);

                return loggeinUser
              } else {
                return null;
              }
            }
        })
    ],

    callbacks: {
      async jwt({ token, account, profile }) {

        console.log('token',token);

        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.accessToken
        }
        return token;
      },

      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        if ( token ) {
          session.accessToken = token.accessToken
        }

        return session;
      }
    }
}

export default NextAuth(authOptions)