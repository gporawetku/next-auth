import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

const login = async ({ email, password }: any) => {
    const user = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/auth/signin',
        data: {
            // email,
            // password,
            email: "admin@ksp.com",
            password: "password"
        }
    });

    if (user) {
        return user;
    } else {
        throw new Error("User not Found!");
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // if (res.ok && user) {
                //     return user
                // }

                const res = await login(credentials);
                const user = res;

                if (user) {
                    return user
                }

                return null
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/auth/signin",
    },
    debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }