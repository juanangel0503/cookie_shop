'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, SelectedCookie } from '@/types';

// Cart state interface
interface CartState {
  items: CartItem[];
  currentPack: any;
  currentPackItems: SelectedCookie[];
  isLoaded: boolean;
}

// Cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENT_PACK'; payload: any }
  | { type: 'SET_CURRENT_PACK_ITEMS'; payload: SelectedCookie[] }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADED'; payload: boolean };

// Initial state
const initialState: CartState = {
  items: [],
  currentPack: null,
  currentPackItems: [],
  isLoaded: false
};

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'SET_CURRENT_PACK':
      return {
        ...state,
        currentPack: action.payload
      };
    
    case 'SET_CURRENT_PACK_ITEMS':
      return {
        ...state,
        currentPackItems: action.payload
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        isLoaded: true
      };
    
    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload
      };
    
    default:
      return state;
  }
}

// Cart context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalValue: () => number;
} | null>(null);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cookieCart');
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          dispatch({ type: 'SET_LOADED', payload: true });
        }
      } else {
        dispatch({ type: 'SET_LOADED', payload: true });
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && state.isLoaded) {
      localStorage.setItem('cookieCart', JSON.stringify(state.items));
    }
  }, [state.items, state.isLoaded]);

  // Helper functions
  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalValue = () => {
    return state.items.reduce((sum, item) => sum + (item.packPrice * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
