import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/node-postgres';
import { nextCookies } from "better-auth/next-js";
import { user, account, session, verification } from '@/db/auth-schema'
import { sendEmail } from "@/actions/email";
import { openAPI } from "better-auth/plugins"
export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
    }
})

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user, account, session, verification

        }
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendOnSignUp: true,
        sendResetPassword : async ({user, url, token}  ,request ) => {
            await sendEmail(
                user.email,
                process.env.SERVER_EMAIL as string,
                "Reset your password",
                `Click the link to reset your password: ${url}`,
            );
            
        }
        

    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const callBackPage = 'user'
            await sendEmail(
                user.email,
                process.env.SERVER_EMAIL as String,
                "Verify your email address",
                `Your account has been craeted plz click the bellow link to verify account \nClick the link to verify your email: ${url}${callBackPage}`,
            );
        },
    },
    session: {
        // expiresIn: 60 * 15, // 15 minutes
        // updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
        // cookieCache: {
        //     enabled: true,
        //     maxAge: 60 * 60 // Cache duration in mins
        // }
    },

    plugins: [openAPI(),nextCookies()]

})

