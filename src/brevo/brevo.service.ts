import dotenv from "dotenv";
dotenv.config();

export interface SendEmailDto {
  to: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
}

class BrevoService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || "";
    this.apiUrl = "https://api.brevo.com/v3/smtp/email";

    if (!this.apiKey) {
      throw new Error("BREVO_API_KEY is missing in environment variables");
    }
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { to, subject, htmlContent, textContent } = sendEmailDto;

    // Prepare recipients
    const recipients = Array.isArray(to)
      ? to.map((email) => ({ email }))
      : [{ email: to }];

    // Build request body
    const payload = {
      sender: { email: process.env.BREVO_SENDER_EMAIL || "" },
      to: recipients,
      subject,
      htmlContent,
      textContent,
    };

    console.log("Sending email payload:", payload);

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey, // Brevo requires api-key header
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Brevo API Error:", data);
        throw new Error(data.message || "Failed to send email");
      }

      console.log("Email sent successfully:", data);
      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

export default new BrevoService();
