import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/language';

export interface Car {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  description_fr: string;
  description_en: string;
  description_de: string;
  description_ar: string;
  features: string;
}

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch cars', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, refetch: fetchCars };
}
