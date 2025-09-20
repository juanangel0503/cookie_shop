// Cookie flavor types
export interface CookieFlavor {
  id: number;
  name: string;
  description: string;
  category: 'chocolate' | 'classic' | 'fruity' | 'seasonal';
  emoji: string;
  calories: string;
  surcharge?: string;
}

// Pack options
export interface PackOption {
  id: string;
  name: string;
  price: number;
  size: number;
}

// Cart item types
export interface CartItem {
  id: string;
  packType: string;
  packName: string;
  packPrice: number;
  packSize: number;
  cookies: SelectedCookie[];
  quantity: number;
}

export interface SelectedCookie {
  id: number;
  name: string;
  quantity: number;
}

// Order types
export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  zipCode: string;
  deliveryDate?: string;
  specialInstructions?: string;
  items: CartItem[];
  orderDate: string;
  totalItems: number;
  totalValue: number;
  orderNumber?: string;
}

// GHL Integration types
export interface GHLResponse {
  success: boolean;
  contactId?: string;
  opportunityId?: string;
  orderNumber?: string;
  message?: string;
  error?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
