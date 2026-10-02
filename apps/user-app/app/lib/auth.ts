import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Enter your name" },
                phone: { label: "Phone number", type: "text", placeholder: "789......." },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials) {
                    return null;
                }

                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const exisitingUser = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (exisitingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, exisitingUser.password);
                    if (passwordValidation) {
                        return {
                            id: exisitingUser.id.toString(),
                            name: exisitingUser.name,
                            phone: exisitingUser.number
                        }
                    }
                    return null
                }

                try {
                    const user = await prisma.user.create({
                        data: {
                            name: credentials.name,
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        phone: user.number
                    };
                } catch (e) {
                    console.error(e);
                }
                return null
            },
        })
    ],

    secret: process.env.NEXTAUTH_SECRET || "secret",
    
    callbacks: {

        redirect({baseUrl}:any) {
            return `${baseUrl}/dashboard`;
        },

        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}
