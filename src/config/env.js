import { config } from "dotenv";

config({
  path: `.env`,
  quiet: true,
});

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
} = globalThis.process.env;
