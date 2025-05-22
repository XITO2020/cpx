import nodemailer from 'nodemailer';
import { formatCurrency } from './utils';

if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
  throw new Error('Email configuration is missing');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface BillingEmailData {
  email: string;
  name: string;
  plan: string;
  amount: number;
  currency: string;
  orderId: string;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
}

export async function sendBillingEmail({
  email,
  name,
  plan,
  amount,
  currency,
  orderId,
  startDate,
  endDate,
  paymentMethod,
}: BillingEmailData) {
  const formattedAmount = formatCurrency(amount, currency);
  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Conspix Subscription Receipt</h1>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #e11d48; margin-bottom: 20px;">Order Details</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ${formattedAmount}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Subscription Period:</strong> ${formattedStartDate} - ${formattedEndDate}</p>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #333;">Hello ${name},</h3>
        <p>Thank you for subscribing to Conspix! Your payment has been processed successfully.</p>
        <p>You now have access to all ${plan} features including:</p>
        <ul>
          ${getPlanFeatures(plan)}
        </ul>
      </div>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333;">Need Help?</h3>
        <p>If you have any questions about your subscription, please contact our support team at support@conspix.com</p>
      </div>

      <div style="text-align: center; color: #666; font-size: 12px; margin-top: 40px;">
        <p>This is an automated email, please do not reply.</p>
        <p>Conspix © ${new Date().getFullYear()}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your Conspix Subscription Receipt',
    html,
  });
}

function getPlanFeatures(plan: string): string {
  const features = {
    basic: [
      'HD streaming',
      'Access to basic content',
      '12 video uploads',
      '30-day video duration',
    ],
    standard: [
      'Full HD streaming',
      'Access to premium content',
      '20 video uploads',
      '90-day video duration',
      'Download & watch offline',
    ],
    premium: [
      '4K Ultra HD streaming',
      'Access to all content',
      '27 video uploads',
      '180-day video duration',
      'Exclusive NFT rewards',
      'Subway map access',
      'Early access to new features',
    ],
  };

  return features[plan as keyof typeof features]
    .map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`)
    .join('');
}