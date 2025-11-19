import { useState, useEffect, useCallback } from 'react';

import { api } from './services/api';
import FilterPanel from './compounds/FilterPanel';
import RestaurantCard from './compounds/RestaurantCard';
import SearchBar from './compounds/SearchBar';
import type { FilterOptions,Restaurant } from './types/restaurant';


function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    cuisine: '',
    priceRange: '',
    minRating: '',
    sortBy: '',
    isOpen: ''
  });

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRestaurants(filters);
      setRestaurants(data);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Debounce search input
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchValue }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSeedData = async () => {
    try {
      await api.seedData();
      fetchRestaurants();
      alert('Sample data seeded successfully!');
    } catch (err) {
      alert('Failed to seed data. Make sure the backend is running.');
      console.error('Error seeding data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-orange-500">🍽️ Foodie</h1>
            <button
              onClick={handleSeedData}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Seed Sample Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar value={searchValue} onChange={setSearchValue} />
        </div>

        {/* Filter Panel */}
        <FilterPanel filters={filters} onFilterChange={setFilters} />

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl mb-4">No restaurants found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold">{restaurants.length}</span> restaurant{restaurants.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Foodie - Restaurant Listing App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;


