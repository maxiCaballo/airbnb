import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProviders from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'


export const authOptions: AuthOptions = {
    adapter:  PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
          GoogleProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
          CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email'},
                password: { label: 'password', type: 'password'}
            },
            //Método que autoriza o no el usuario en funcion de sus credenciales
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if( !user || !user?.hashedPassword){  
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }

                return user
            }
          })
    ],
    pages: {
        signIn: '/'       
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_URL
}

export default NextAuth(authOptions)