import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


const domain = "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string)=>{
    // create confirmation link

    const confirmationLink = `${domain}/verify-email?token=${token}&email=${email}`;

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your email",
      html: `
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email address</p>
        <a href="${confirmationLink}">Confirm email</a>
      `,
    });
}


// Todo: Delete email thats assocaited with the resend account with all of its data
// so that you can check if the email gets sent to the user