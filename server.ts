import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("autombk.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    img TEXT NOT NULL,
    category TEXT NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    description_de TEXT,
    description_ar TEXT,
    features TEXT
  )
`);

const initialCars = [
  { 
    id: 'c1', 
    name: 'Citroën C1 (2012)', 
    price: '30 CHF / jour · 600 CHF / mois', 
    img: 'https://picsum.photos/seed/c1/800/600',
    category: 'confortable',
    description_fr: 'Citadine compacte idéale pour les petits trajets.',
    description_en: 'Compact city car, ideal for short trips.',
    description_de: 'Kompakter Stadtwagen, ideal für kurze Strecken.',
    description_ar: 'سيارة مدينة مدمجة مثالية للاستخدام اليومي.',
    features: ''
  },
  { 
    id: 'p107', 
    name: 'Peugeot 107', 
    price: '30 CHF / jour · 600 CHF / mois', 
    img: 'https://picsum.photos/seed/p107/800/600',
    category: 'confortable',
    description_fr: 'Petite voiture économique et maniable en ville.',
    description_en: 'Small, economical and easy to drive in the city.',
    description_de: 'Praktischer, sparsamer Kleinwagen – perfekt für die Stadt.',
    description_ar: 'سيارة صغيرة اقتصادية وسهلة القيادة داخل المدينة.',
    features: ''
  },
  { 
    id: 'y17', 
    name: 'Toyota Yaris Hybride (2017)', 
    price: '60 CHF / jour · 1200 CHF / mois', 
    img: 'https://picsum.photos/seed/y17/800/600',
    category: 'confortable',
    description_fr: 'Automatique, Hybride, confortable et sobre.',
    description_en: 'Automatic, Hybrid, comfortable and economical.',
    description_de: 'Automatik, Hybrid, komfortabel und sparsam.',
    description_ar: 'سيارة هجينة أوتوماتيكية، مريحة وموفرة للوقود.',
    features: 'Caméra de recul, Aide au parcage'
  },
  { 
    id: 'a14', 
    name: 'Toyota Auris Hybride (2014)', 
    price: '55 CHF / jour · 1000 CHF / mois', 
    img: 'https://picsum.photos/seed/a14/800/600',
    category: 'confortable',
    description_fr: 'Hybride bleue, idéale pour les longs trajets.',
    description_en: 'Blue Hybrid, ideal for long trips.',
    description_de: 'Blauer Hybrid, ideal für lange Fahrten.',
    description_ar: 'سيارة هجينة زرقاء مثالية للرحلات الطويلة.',
    features: 'Caméra de recul, Aide au parcage'
  },
  { 
    id: 'y19', 
    name: 'Toyota Yaris Hybride (2019)', 
    price: '70 CHF / jour · 1300 CHF / mois', 
    img: 'https://picsum.photos/seed/y19/800/600',
    category: 'confortable',
    description_fr: 'Hybride noire automatique, moderne et économe.',
    description_en: 'Black Automatic Hybrid, modern and efficient.',
    description_de: 'Schwarzer Automatik-Hybrid, modern und effizient.',
    description_ar: 'سيارة هجينة سوداء أوتوماتيكية حديثة واقتصادية.',
    features: 'Caméra de recul, Aide au parcage'
  },
  { 
    id: 'm3', 
    name: 'BMW M3 G80 Compétition (2022)', 
    price: '560 CHF / jour', 
    img: 'https://picsum.photos/seed/m3/800/600',
    category: 'luxe',
    description_fr: 'Sportive verte avec lame avant & calandre CSL, 510 ch !',
    description_en: 'Green sports car with front lip & CSL grille, 510 hp!',
    description_de: 'Grüner Sportwagen mit Frontlippe & CSL-Kühlergrill, 510 PS !',
    description_ar: 'سيارة رياضية خضراء مع جناح أمامي وشبكة CSL، بقوة 510 حصان!',
    features: 'Performance, Luxe'
  },
  { 
    id: 'master', 
    name: 'Renault Master L2H2', 
    price: '120 CHF / jour', 
    img: 'https://picsum.photos/seed/master/800/600',
    category: 'utilitaire',
    description_fr: 'Grand utilitaire idéal pour vos déménagements.',
    description_en: 'Large utility vehicle ideal for your moves.',
    description_de: 'Großes Nutzfahrzeug, ideal für Ihre Umzüge.',
    description_ar: 'سيارة نقل كبيرة مثالية لعمليات النقل.',
    features: 'Grand volume'
  },
];

const insertCar = db.prepare(`
  INSERT OR IGNORE INTO cars (id, name, price, img, category, description_fr, description_en, description_de, description_ar, features)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

initialCars.forEach(car => {
  insertCar.run(car.id, car.name, car.price, car.img, car.category, car.description_fr, car.description_en, car.description_de, car.description_ar, car.features);
});

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Routes
  app.get("/api/cars", (req, res) => {
    const cars = db.prepare("SELECT * FROM cars").all();
    res.json(cars);
  });

  app.post("/api/cars", (req, res) => {
    const { id, name, price, img, category, description_fr, description_en, description_de, description_ar, features } = req.body;
    try {
      db.prepare(`
        INSERT INTO cars (id, name, price, img, category, description_fr, description_en, description_de, description_ar, features)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id || Math.random().toString(36).substr(2, 9), name, price, img, category, description_fr, description_en, description_de, description_ar, features);
      res.status(201).json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/cars/:id", (req, res) => {
    const { name, price, img, category, description_fr, description_en, description_de, description_ar, features } = req.body;
    const { id } = req.params;
    try {
      db.prepare(`
        UPDATE cars 
        SET name = ?, price = ?, img = ?, category = ?, description_fr = ?, description_en = ?, description_de = ?, description_ar = ?, features = ?
        WHERE id = ?
      `).run(name, price, img, category, description_fr, description_en, description_de, description_ar, features, id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/cars/:id", (req, res) => {
    db.prepare("DELETE FROM cars WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
