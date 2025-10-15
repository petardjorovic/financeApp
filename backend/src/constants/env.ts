const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Mising enviroment variable ${key}`);
  }

  return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4000");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const MONGO_ATLAS_URI = getEnv("MONGO_ATLAS_URI");
export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
export const EMAIL_HOST = getEnv("EMAIL_HOST");
export const EMAIL_PORT = getEnv("EMAIL_PORT");
export const USER_EMAIL_ADDRESS = getEnv("USER_EMAIL_ADDRESS");
export const EMAIL_PASS = getEnv("EMAIL_PASS");
export const MAILTRAP_HOST = getEnv("MAILTRAP_HOST");
export const MAILTRAP_PORT = getEnv("MAILTRAP_PORT");
export const MAILTRAP_USERNAME = getEnv("MAILTRAP_USERNAME");
export const MAILTRAP_PASSWORD = getEnv("MAILTRAP_PASSWORD");
