import { useState, FormEvent, ChangeEvent } from 'react';
import { useCars, Car } from '../lib/api';
import { useLanguage } from '../lib/language';
import { motion } from 'motion/react';
import { Trash2, Edit, Plus, X, Save, Lock, Upload, Image as ImageIcon, ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { cars, refetch } = useCars();
  const { t } = useLanguage();
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (accessCode.toLowerCase() === 'mbk') {
      setIsAuthorized(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingCar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingCar({ ...editingCar, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    const method = editingCar.id ? 'PUT' : 'POST';
    const url = editingCar.id ? `/api/cars/${editingCar.id}` : '/api/cars';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCar),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingCar(null);
        refetch();
      }
    } catch (error) {
      console.error('Error saving car', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/cars/${id}`, { method: 'DELETE' });
      refetch();
    } catch (error) {
      console.error('Error deleting car', error);
    }
  };

  const openEdit = (car: Car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingCar({
      category: 'confortable',
      description_fr: '',
      description_en: '',
      description_de: '',
      description_ar: '',
      img: '',
    });
    setIsModalOpen(true);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center text-red-500 mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-tighter">Admin Access</h1>
            <p className="text-zinc-500 text-sm">Enter the code to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className={`w-full bg-zinc-800 border ${loginError ? 'border-red-500' : 'border-zinc-700'} rounded-xl p-4 text-white outline-none focus:border-red-500 transition-colors`}
              />
              {loginError && <p className="text-red-500 text-xs mt-2 ml-1">Incorrect code. Try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/20 uppercase tracking-widest"
            >
              Login
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-red-500 uppercase tracking-tighter">{t('admin.title')}</h1>
            <p className="text-zinc-500">Manage your fleet and listings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthorized(false)}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-4 py-3 rounded-xl transition-all active:scale-95 font-bold text-sm uppercase tracking-widest"
              title="Logout"
            >
              <LogOut size={18} />
              Logout
            </button>
            <button
              onClick={openNew}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl transition-all active:scale-95 font-bold uppercase tracking-widest text-sm"
            >
              <Plus size={20} />
              {t('admin.add_car')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group">
              <div className="relative h-48 overflow-hidden">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openEdit(car)}
                    className="p-2 bg-black/50 backdrop-blur-md text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="p-2 bg-black/50 backdrop-blur-md text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight text-red-500">{car.name}</h3>
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400 capitalize">{car.category}</span>
                </div>
                <p className="text-red-500 font-bold">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && editingCar && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-zinc-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 border border-zinc-800 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {editingCar.id ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Vehicle Name</label>
                    <input
                      required
                      placeholder="e.g. BMW M3 G80"
                      value={editingCar.name || ''}
                      onChange={e => setEditingCar({ ...editingCar, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Price Label</label>
                    <input
                      required
                      placeholder="e.g. 560 CHF / jour"
                      value={editingCar.price || ''}
                      onChange={e => setEditingCar({ ...editingCar, price: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={editingCar.category || 'confortable'}
                      onChange={e => setEditingCar({ ...editingCar, category: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-red-500 transition-colors appearance-none"
                    >
                      <option value="luxe">Voiture de Luxe</option>
                      <option value="confortable">Voiture Confortable</option>
                      <option value="utilitaire">Voiture Utilitaire</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Vehicle Image</label>
                  <div className="relative aspect-video bg-zinc-800 rounded-2xl border-2 border-dashed border-zinc-700 overflow-hidden group">
                    {editingCar.img ? (
                      <>
                        <img src={editingCar.img} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                            <Upload size={16} />
                            Change Photo
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-700/50 transition-colors">
                        <ImageIcon size={48} className="text-zinc-600 mb-2" />
                        <span className="text-sm text-zinc-500 font-bold">Upload from Gallery</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                  <input
                    placeholder="Or paste Image URL"
                    value={editingCar.img || ''}
                    onChange={e => setEditingCar({ ...editingCar, img: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-400 outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Descriptions (Multi-language)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    placeholder="Français"
                    value={editingCar.description_fr || ''}
                    onChange={e => setEditingCar({ ...editingCar, description_fr: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:border-red-500 outline-none"
                  />
                  <input
                    placeholder="English"
                    value={editingCar.description_en || ''}
                    onChange={e => setEditingCar({ ...editingCar, description_en: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:border-red-500 outline-none"
                  />
                  <input
                    placeholder="Deutsch"
                    value={editingCar.description_de || ''}
                    onChange={e => setEditingCar({ ...editingCar, description_de: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm focus:border-red-500 outline-none"
                  />
                  <input
                    placeholder="Arabic"
                    dir="rtl"
                    value={editingCar.description_ar || ''}
                    onChange={e => setEditingCar({ ...editingCar, description_ar: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm font-arabic focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8 transition-all active:scale-95 shadow-xl shadow-red-900/20 uppercase tracking-widest"
              >
                <Save size={20} />
                Save Vehicle
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

