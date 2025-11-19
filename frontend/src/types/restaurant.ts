export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  deliveryTime: number;
  image: string;
  description?: string;
  isOpen: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FilterOptions {
  search: string;
  cuisine: string;
  priceRange: string;
  minRating: string;
  sortBy: string;
  isOpen: string;
}

