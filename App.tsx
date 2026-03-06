import { CarList } from './components/CarList';
import { AddCarForm } from './components/AddCarForm';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', background: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '36px' }}>🚗 AUTO MBK LOCATION</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: 0.9 }}>Location de voitures premium en Suisse</p>
      </header>
      
      <main style={{ padding: '20px' }}>
        <AddCarForm />
        <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ddd' }} />
        <CarList />
      </main>
    </div>
  );
}

export default App;
