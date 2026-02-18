import config from "../../config";

const emailSender = async (email: string, html: string) => {
  const apiKey = config.brevo.api_key;
  const senderEmail = config.brevo.sender_email;
  const senderName = config.brevo.sender_name || "Portfolio";

  if (!apiKey || !senderEmail) {
    throw new Error(
      "Brevo configuration is missing. Set BREVO_API_KEY and BREVO_SENDER_EMAIL in .env.",
    );
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email }],
      subject: "Thanks for contact...",
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo email send failed: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  console.log("Brevo message sent:", result?.messageId || "ok");
};

export default emailSender;
