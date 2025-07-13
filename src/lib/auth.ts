import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins"
import { PrismaClient } from "@prisma/client";
import { sendResetPassLink } from "./resend";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url, token }, request) => {
            // Vous avez déjà l'URL finale dans la variable `url` !
            // Ou si votre fonction a besoin du token, utilisez `token`.
            await sendResetPassLink(user.email, token);
        },
    },
    user: {
        changeEmail: {
            enabled: true,
            // sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
            //     await sendEmail({
            //         to: user.email, // verification email must be sent to the current user email to approve the change
            //         subject: 'Approve email change',
            //         text: `Click the link to approve the change: ${url}`
            //     })
            // }
        }
    },
    plugins: [
        admin()
    ]
});