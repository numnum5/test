import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, refresh } from "./auth-actions";
import type {
  AuthOptions,
  User,
  UserObject,
  AuthValidity,
  BackendAccessJWT,
  BackendJWT,
  DecodedJWT
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    // Get a new access token from backend using the refresh token
    const res = await refresh(nextAuthJWTCookie.data.tokens.refresh);
    const accessToken: BackendAccessJWT = await res.json();

    if (!res.ok) throw accessToken;
    const { exp }: DecodedJWT = jwtDecode(accessToken.access);

    // Update the token and validity in the next-auth cookie
    nextAuthJWTCookie.data.validity.valid_until = exp;
    nextAuthJWTCookie.data.tokens.access = accessToken.access;
    
    // Clone the object to ensure it has a new ref id
    return { ...nextAuthJWTCookie };
  } catch (error) {
    console.debug(error);
    return {
      ...nextAuthJWTCookie,
      error: "RefreshAccessTokenError"
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "john"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {

          console.log(credentials?.password, credentials?.username);
          const res = await login(
            credentials?.username || "",
            credentials?.password || ""
          );
          
          

          const tokens = await res.json();

          // console.log(tokens);
          if (!res.ok) throw tokens;

          const access: DecodedJWT = jwtDecode(tokens.access);
          const refresh: DecodedJWT = jwtDecode(tokens.refresh);
          // Extract the user from the access token
          console.log("access information");
          console.log(access.username, access.email, access.id);
          const user: UserObject = {
            username: access.username,
            email: access.email,
            id: access.id
          };
          // Extract the auth validity from the tokens
          const validity: AuthValidity = {
            valid_until: access.exp,
            refresh_until: refresh.exp
          };
          // Return the object that next-auth calls 'User' 


          const test : User = {
            // User object needs to have a string id so use refresh token id
            id: refresh.jti,
            tokens: tokens,
            user : user,
            validity: validity
          };
          console.log("TEZTST::::");
          console.log(test);

          return {
            // User object needs to have a string id so use refresh token id
            id: refresh.jti,
            tokens: tokens,
            user : user,
            validity: validity
          } as User;
        } catch (error) {
          console.error(error);
          throw new Error("error occurred");
        }
      }
    })
  ],
  // events: {
  //   async signOut({ token }) {
  //     await fetch("https://your-backend.com/api/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token.user.tokens.access}`,
  //       },
  //       body: JSON.stringify({ refreshToken: token?.tokens?.refresh }),
  //     });
  //   },
  // },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {

      console.log(token, user, account);
      // Initial signin contains a 'User' object from authorize method
      if (user && account) {
        console.debug("Initial signin");
        return { ...token, data: user };
      }

      // The current access token is still valid
      if (Date.now() < token.data.validity.valid_until * 1000) {
        console.debug("Access token is still valid");
        return token;
      }

      // The refresh token is still valid
      if (Date.now() < token.data.validity.refresh_until * 1000) {
        console.debug("Access token is being refreshed");
        return await refreshAccessToken(token);
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug("Both tokens have expired");
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token, user }) {

      console.log(user);
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };