import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../../src/lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const result = await sql`SELECT * FROM cars WHERE id = ${id}`;
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Voiture non trouvée' });
      }
      
      return res.status(200).json(result[0]);
    }

    if (req.method === 'PUT') {
      const { brand, model, year, price_per_day, description, image_url, available } = req.body;
      
      const result = await sql`
        UPDATE cars 
        SET brand = ${brand}, model = ${model}, year = ${year}, 
            price_per_day = ${price_per_day}, description = ${description}, 
            image_url = ${image_url}, available = ${available}
        WHERE id = ${id}
        RETURNING *
      `;
      
      return res.status(200).json(result[0]);
    }

    if (req.method === 'DELETE') {
      await sql`DELETE FROM cars WHERE id = ${id}`;
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
