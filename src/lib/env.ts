// Environment variable validation
// Fails gracefully with clear error messages if required vars are missing

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || "";
}

function getEnvVarOptional(name: string): string | undefined {
  return process.env[name];
}

// Database
export const DATABASE_URL = () => getEnvVar("DATABASE_URL");

// NextAuth.js
export const NEXTAUTH_SECRET = () => getEnvVar("NEXTAUTH_SECRET");
export const NEXTAUTH_URL = () => getEnvVar("NEXTAUTH_URL");

// Stripe
export const STRIPE_SECRET_KEY = () => getEnvVar("STRIPE_SECRET_KEY");
export const STRIPE_PUBLISHABLE_KEY = () => getEnvVar("STRIPE_PUBLISHABLE_KEY");
export const STRIPE_WEBHOOK_SECRET = () => getEnvVar("STRIPE_WEBHOOK_SECRET");

// Image Storage - Cloudinary
export const CLOUDINARY_CLOUD_NAME = () => getEnvVarOptional("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = () => getEnvVarOptional("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = () => getEnvVarOptional("CLOUDINARY_API_SECRET");

// Image Storage - AWS S3 (alternative)
export const AWS_ACCESS_KEY_ID = () => getEnvVarOptional("AWS_ACCESS_KEY_ID");
export const AWS_SECRET_ACCESS_KEY = () => getEnvVarOptional("AWS_SECRET_ACCESS_KEY");
export const AWS_REGION = () => getEnvVarOptional("AWS_REGION");
export const AWS_S3_BUCKET = () => getEnvVarOptional("AWS_S3_BUCKET");

// Email
export const RESEND_API_KEY = () => getEnvVarOptional("RESEND_API_KEY");
export const SENDGRID_API_KEY = () => getEnvVarOptional("SENDGRID_API_KEY");

// Application
export const NEXT_PUBLIC_SITE_URL = () =>
  getEnvVar("NEXT_PUBLIC_SITE_URL", false) || "http://localhost:3000";

// Validation helper - call at app startup to verify required vars
export function validateEnv(): void {
  const requiredVars = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "STRIPE_SECRET_KEY",
    "STRIPE_PUBLISHABLE_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];

  const missing = requiredVars.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing.join(", "));
    console.error("Please check your .env.local file. See .env.example for reference.");
  }

  // Validate image storage configuration
  const hasCloudinary =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  const hasS3 =
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION &&
    process.env.AWS_S3_BUCKET;

  if (!hasCloudinary && !hasS3) {
    console.warn(
      "Warning: No image storage configured. Set either Cloudinary or AWS S3 variables."
    );
  }

  // Validate email configuration
  const hasEmail = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;
  if (!hasEmail) {
    console.warn("Warning: No email provider configured. Set either RESEND_API_KEY or SENDGRID_API_KEY.");
  }
}
