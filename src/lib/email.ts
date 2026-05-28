import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (resend) return resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend = new Resend(apiKey);
  return resend;
}

interface FeedbackNotificationData {
  branchName: string;
  orderType: string;
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  comments?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  wouldRecommend: boolean;
}

/**
 * Send email notification when new feedback is submitted.
 * Fire-and-forget — failures are logged but don't block the response.
 */
export async function sendFeedbackNotification(data: FeedbackNotificationData): Promise<void> {
  const client = getResend();
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!client || !adminEmail) return;

  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
  const recommend = data.wouldRecommend ? "Yes" : "No";

  try {
    await client.emails.send({
      // Test mode: use onboarding@resend.dev until your domain is verified in Resend.
      // Then switch to e.g. "Ayers Lechon <notifications@yourdomain.com>"
      from: "Ayers Lechon Feedback <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Feedback: ${stars(data.overallRating)} from ${data.branchName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B1A1A;">New Customer Feedback</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Branch:</td><td style="padding: 8px;">${data.branchName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Order Type:</td><td style="padding: 8px;">${data.orderType}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Overall:</td><td style="padding: 8px;">${stars(data.overallRating)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Food:</td><td style="padding: 8px;">${stars(data.foodRating)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${stars(data.serviceRating)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Cleanliness:</td><td style="padding: 8px;">${stars(data.cleanlinessRating)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Would Recommend:</td><td style="padding: 8px;">${recommend}</td></tr>
            ${data.customerName ? `<tr><td style="padding: 8px; font-weight: bold;">Customer:</td><td style="padding: 8px;">${data.customerName}</td></tr>` : ""}
            ${data.comments ? `<tr><td style="padding: 8px; font-weight: bold;">Comments:</td><td style="padding: 8px;">${data.comments}</td></tr>` : ""}
          </table>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">This is an automated notification from Cebu's Ayers Lechon feedback system.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[Email] Failed to send feedback notification:", error);
  }
}
