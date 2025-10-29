import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // if you have a verified domain
            to,
            subject,
            html,
        });

        if (error) {
            console.error("Resend error:", error);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Email send error:", err);
        return false;
    }
}
