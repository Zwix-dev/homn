import { Resend } from 'resend';

import { EmailTemplate } from '@/components/auth/email-template';

export const resend = new Resend("re_FesZ6D6o_QGm8JARrBESUmcJqwCtKGb22");

// export const sendVerificationEmail = async (email: string, token: string) => {
//     const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

//     await resend.emails.send({
//         from:"noreply@arthur-duval.dev", 
//         to: email,
//         subject: "E-mail verification email",
//         react: EmailTemplate({ firstName: confirmLink}),

//     })
// }
export const sendResetPassLink = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;
   
    await resend.emails.send({
        from: "noreply@arthur-duval.dev", 
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        react: EmailTemplate({ linkUrl: confirmLink }), 
    });
};