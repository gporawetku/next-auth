import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

const login = async ({ email, password }: any) => {
    const user = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/auth/signin',
        data: {
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
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {


                const res = await login(credentials);
                const user = await res.data;

                if (res.status === 200 && user) {
                    return user
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    // pages: {
    //     signIn: "/auth/signin",
    // },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        async session({ session, token, user }: any) {
            if (token) {
                session.token = token.token
                session.user = token.user
            }
            return session
        },
    },
    debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }