"use server";

interface IEmailInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const contactEmailSend = async (emailData: IEmailInput) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to send email");
        }
        return data;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to send email",
        };
    }
}