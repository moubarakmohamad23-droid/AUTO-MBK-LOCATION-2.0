import { useState } from 'react';
import { useCars } from '../hooks/useCars';

export function AddCarForm() {
  const { addCar } = useCars();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price_per_day: 100,
    description: '',
    image_url: '',
    available: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addCar(formData);
    if (success) {
      setSubmitted(true);
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price_per_day: 100,
        description: '',
        image_url: '',
        available: true,
      });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🚗 Ajouter une voiture</h2>
      
      {submitted && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
          ✅ Voiture ajoutée avec succès !
        </div>
      )}
      
      <div style={{ marginBottom: '15px' }}>
        <label>Marque :</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Modèle :</label>
        <input type="text" name="model" value={formData.model} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Année :</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Prix par jour (€) :</label>
        <input type="number" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Description :</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '100px' }} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>URL de l'image :</label>
        <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} placeholder="https://..." />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Disponible immédiatement
        </label>
      </div>
      
      <button type="submit" style={{ 
        background: '#3498db', 
        color: 'white', 
        border: 'none', 
        padding: '15px', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        width: '100%',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        ➕ Ajouter la voiture
      </button>
    </form>
  );
}
