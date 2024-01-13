// Database
export const REDIS_CONNECTION_URL = process.env.REDIS_CONNECTION_URL ?? 'redis://localhost:6379';
export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

// Google Places API
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? '';

// Public
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8000';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

// AWS
export const AWS_REGION = process.env.AWS_REGION ?? 'ap-northeast-1';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME ?? 'bucket';
