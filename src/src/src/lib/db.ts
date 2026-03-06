import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  description: string;
  image_url: string;
  available: boolean;
  created_at: string;
}
