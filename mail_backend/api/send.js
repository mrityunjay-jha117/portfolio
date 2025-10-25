const nodemailer = require("nodemailer");
const { z } = require("zod");

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

function createTransporterFromEnv() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "true") === "true";

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

module.exports = async (req, res) => {
  // Basic CORS handling for serverless environments (Vercel, Netlify, etc.)
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    // Reply to preflight
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const parse = ContactSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: "invalid_payload", details: parse.error.errors });
  }

  const { name, email, subject, message } = parse.data;

  const transporter = createTransporterFromEnv();
  if (!transporter)
    return res.status(500).json({ error: "smtp_not_configured" });

  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const toEmail = process.env.TO_EMAIL;
  if (!toEmail) return res.status(500).json({ error: "to_email_missing" });

  const mailOptions = {
    from: `"${name}" <${fromEmail}>`,
    to: toEmail,
    subject: subject ? `Contact form: ${subject}` : `Contact form from ${name}`,
    text: `You received a new message from ${name} (${email}):\n\n${message}`,
    html: `<p>You received a new message from <strong>${name}</strong> (<a href="mailto:${email}">${email}</a>):</p><blockquote>${message}</blockquote>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, info });
  } catch (err) {
    console.error("sendMail error", err);
    return res.status(500).json({ error: "send_failed", message: String(err) });
  }
};
