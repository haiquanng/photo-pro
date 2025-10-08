// Environment configuration
export const env = {
  // API
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379'),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: parseInt(process.env.REDIS_DB || '0'),
  
  // Authentication
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // File Upload
  MAX_FILE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'), // 10MB
  ALLOWED_FILE_TYPES: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,video/mp4,video/quicktime').split(','),
  
  // Analytics
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  
  // Payment
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
  // Storage
  STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  
  // Development
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// Validation
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_API_URL',
    'NEXTAUTH_SECRET',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Export default
export default env;
