import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../src/lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const cars = await sql`SELECT * FROM cars ORDER BY created_at DESC`;
      return res.status(200).json(cars);
    }

    if (req.method === 'POST') {
      const { brand, model, year, price_per_day, description, image_url } = req.body;
      
      const result = await sql`
        INSERT INTO cars (brand, model, year, price_per_day, description, image_url) 
        VALUES (${brand}, ${model}, ${year}, ${price_per_day}, ${description}, ${image_url})
        RETURNING *
      `;
      
      return res.status(201).json(result[0]);
    }

    return res.status(405).json({ error: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
