import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequest) {
    return NextResponse.rewrite(new URL( request.url ));
  },
  {
    callbacks: {
      authorized: async({ token }) => {

        const req = await fetch(
            process.env.NEXT_PUBLIC_JWT_BASE + 'token/validate',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token.accessToken,
                }
            }
        );

        const login_token = await req.json();

        if ( login_token.code == 'jwt_auth_valid_token' ) {
            return true;
        }

      }
    }
  }
)

export const config = { matcher: ["/", "/blogs"] }