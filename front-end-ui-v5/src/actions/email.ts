"use server"
import { transporter } from "@/lib/email";

export async function sendEmail(to : String , from : String , subject : String, text : String) {
    const message = { 
        to : to.toLowerCase().trim(),
        from : from.toLowerCase().trim(),
        subject : subject.trim(),
        text : text.trim()
    }
    try {
        const info = await transporter.sendMail(message);
        console.log("Message sent: %s", info)
        return { success: true, message: "Email sent successfully" };

    } catch (error) {
        console.log(error)
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending email" };
        
    }
    
}