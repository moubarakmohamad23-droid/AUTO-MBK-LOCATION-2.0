import { useState, useEffect, useCallback } from 'react';

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

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cars');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setCars(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCar = async (car: Omit<Car, 'id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout');
      await fetchCars();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    }
  };

  const updateCar = async (id: number, car: Partial<Car>) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification');
      await fetchCars();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    }
  };

  const deleteCar = async (id: number) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      await fetchCars();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    }
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return { cars, loading, error, fetchCars, addCar, updateCar, deleteCar };
}
