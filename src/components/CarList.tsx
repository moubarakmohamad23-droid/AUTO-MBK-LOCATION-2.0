import { useCars } from '../hooks/useCars';

export function CarList() {
  const { cars, loading, error, deleteCar } = useCars();

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Chargement...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>Erreur : {error}</div>;
  if (cars.length === 0) return <div style={{ textAlign: 'center' }}>Aucune voiture disponible</div>;

  const handleDelete = async (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer cette voiture ?')) {
      await deleteCar(id);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Nos Voitures</h2>
      {cars.map((car) => (
        <div 
          key={car.id} 
          style={{ 
            border: '1px solid #ddd', 
            borderRadius: '12px', 
            padding: '20px',
            display: 'flex',
            gap: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <img 
            src={car.image_url} 
            alt={`${car.brand} ${car.model}`}
            style={{ width: '250px', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div style={{ flex: 1 }}>
            <h3>{car.brand} {car.model} ({car.year})</h3>
            <p style={{ color: '#666' }}>{car.description}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
              {car.price_per_day}€ / jour
            </p>
            <p style={{ 
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '20px',
              background: car.available ? '#d4edda' : '#f8d7da',
              color: car.available ? '#155724' : '#721c24'
            }}>
              {car.available ? '✅ Disponible' : '❌ Non disponible'}
            </p>
            <br /><br />
            <button 
              onClick={() => handleDelete(car.id)}
              style={{ 
                background: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
