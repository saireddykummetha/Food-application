import React, { useEffect, useState } from "react";
import { api } from "../services/api.ts";
import type { FilterOptions } from "../types/restaurant";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  // Store list of cuisines coming from API
  const [cuisines, setCuisines] = useState<string[]>([]);

  // Fetch cuisines when the component loads
  useEffect(() => {
    async function loadCuisines() {
      try {
        const data = await api.getCuisines(); // calling backend
        setCuisines(data); // storing data into state
      } catch (error) {
        console.log("Failed to load cuisines", error);
      }
    }

    loadCuisines();
  }, []);

  // Update any filter value (price, cuisine, rating etc)
  const updateFilter = (filterName: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [filterName]: value, // update only this one filter
    });
  };

  // Clear all filters
  const resetFilters = () => {
    onFilterChange({
      search: "",
      cuisine: "",
      priceRange: "",
      minRating: "",
      sortBy: "",
      isOpen: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Cuisine Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Cuisine</label>
          <select
            value={filters.cuisine}
            onChange={(e) => updateFilter("cuisine", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter("priceRange", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Prices</option>
            <option value="$">Budget</option>
            <option value="$$">Moderate</option>
            <option value="$$$">Expensive</option>
            <option value="$$$$">Very Expensive</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Minimum Rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => updateFilter("minRating", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.0">4.0+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
            <option value="3.0">3.0+ ⭐</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="rating">Highest Rating</option>
            <option value="deliveryTime">Fastest Delivery</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Clear all filters button */}
      <button
        onClick={resetFilters}
        className="mt-4 text-orange-500 font-semibold"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;
