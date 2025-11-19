import React from 'react';
import type{ Restaurant } from '../types/restaurant';
interface RestaurantCardProps {
  restaurant: Restaurant;
 
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-green-400';
    if (rating >= 3.5) return 'bg-yellow-400';
    return 'bg-orange-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Restaurant';
          }}
        />
   
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-1 ${getRatingColor(restaurant.rating)}`}>
          <span>★</span>
          <span>{restaurant.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine} • {restaurant.location}</p>
        {restaurant.description && (
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{restaurant.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">{restaurant.priceRange}</span>
            <span className="text-gray-600 text-sm">⏱ {restaurant.deliveryTime} min</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

