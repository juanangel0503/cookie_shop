import { GHLProduct, GHLProductResponse, ProductCategory } from '@/types';

// Demo data for fallback
const demoProducts: GHLProduct[] = [
  {
    id: "1",
    name: "Chocolate Chip Cookie",
    description: "Classic chocolate chip cookie with premium ingredients",
    price: 3.50,
    category: "cookies",
    image: "/images/chocolate-chip.jpg",
    variants: [
      { id: "1", name: "Single", price: 3.50 },
      { id: "2", name: "4-Pack", price: 12.00 },
      { id: "3", name: "6-Pack", price: 18.00 },
      { id: "4", name: "12-Pack", price: 35.00 }
    ]
  },
  {
    id: "2", 
    name: "Vanilla Sugar Cookie",
    description: "Buttery soft sugar cookies with real vanilla extract",
    price: 3.00,
    category: "cookies",
    image: "/images/vanilla-sugar.jpg",
    variants: [
      { id: "1", name: "Single", price: 3.00 },
      { id: "2", name: "4-Pack", price: 10.00 },
      { id: "3", name: "6-Pack", price: 15.00 },
      { id: "4", name: "12-Pack", price: 28.00 }
    ]
  },
  {
    id: "3",
    name: "4-Pack Cookie Box", 
    description: "Assorted cookie 4-pack with variety of flavors",
    price: 12.00,
    category: "packs",
    image: "/images/4-pack.jpg",
    variants: [
      { id: "1", name: "4-Pack", price: 12.00 }
    ]
  },
  {
    id: "4",
    name: "6-Pack Cookie Box",
    description: "Premium 6-pack with gourmet cookie selection", 
    price: 18.00,
    category: "packs",
    image: "/images/6-pack.jpg",
    variants: [
      { id: "1", name: "6-Pack", price: 18.00 }
    ]
  },
  {
    id: "5",
    name: "12-Pack Cookie Box",
    description: "Family size 12-pack with mixed flavors",
    price: 35.00, 
    category: "packs",
    image: "/images/12-pack.jpg",
    variants: [
      { id: "1", name: "12-Pack", price: 35.00 }
    ]
  }
];

const demoCategories: ProductCategory[] = [
  { id: "1", name: "Cookies", description: "Individual cookie flavors" },
  { id: "2", name: "Packs", description: "Cookie packs and boxes" }
];

export class GHLProductsIntegration {
  private apiKey: string;
  private locationId: string;
  private baseUrl: string;
  private demoMode: boolean;

  constructor() {
    this.apiKey = process.env.GHL_API_KEY || '';
    this.locationId = process.env.GHL_LOCATION_ID || '';
    this.baseUrl = 'https://services.leadconnectorhq.com';
    
    // Enable demo mode if credentials are missing or are placeholders
    this.demoMode = !this.apiKey || !this.locationId || 
                   this.apiKey.includes('YOUR_') || 
                   this.locationId.includes('YOUR_');
  }

  // Get all products
  async getProducts(): Promise<{ success: boolean; products?: GHLProduct[]; error?: string }> {
    if (this.demoMode) {
      console.log('GHL Products: Using demo mode');
      return { success: true, products: demoProducts };
    }

    try {
      const response = await this.makeAPICall('/products');
      return {
        success: true,
        products: response.products || []
      };
    } catch (error) {
      console.error('GHL Products Error:', error);
      // Fallback to demo data on error
      return { success: true, products: demoProducts };
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId: string): Promise<{ success: boolean; products?: GHLProduct[]; error?: string }> {
    if (this.demoMode) {
      const filteredProducts = demoProducts.filter(p => p.category === categoryId.toLowerCase());
      return { success: true, products: filteredProducts };
    }

    try {
      const response = await this.makeAPICall(`/products?category=${categoryId}`);
      return {
        success: true,
        products: response.products || []
      };
    } catch (error) {
      console.error('GHL Products Error:', error);
      // Fallback to demo data on error
      const filteredProducts = demoProducts.filter(p => p.category === categoryId.toLowerCase());
      return { success: true, products: filteredProducts };
    }
  }

  // Get all categories
  async getCategories(): Promise<{ success: boolean; categories?: ProductCategory[]; error?: string }> {
    if (this.demoMode) {
      return { success: true, categories: demoCategories };
    }

    try {
      const response = await this.makeAPICall('/categories');
      return {
        success: true,
        categories: response.categories || []
      };
    } catch (error) {
      console.error('GHL Categories Error:', error);
      // Fallback to demo data on error
      return { success: true, categories: demoCategories };
    }
  }

  // Get single product by ID
  async getProduct(productId: string): Promise<{ success: boolean; product?: GHLProduct; error?: string }> {
    if (this.demoMode) {
      const product = demoProducts.find(p => p.id === productId);
      if (!product) {
        return { success: false, error: 'Product not found' };
      }
      return { success: true, product };
    }

    try {
      const allProducts = await this.getProducts();
      
      if (!allProducts.success || !allProducts.products) {
        return { success: false, error: 'Failed to fetch products' };
      }

      const product = allProducts.products.find(p => p.id === productId);
      
      if (!product) {
        return { success: false, error: 'Product not found' };
      }

      return {
        success: true,
        product
      };
    } catch (error) {
      console.error('GHL Product Error:', error);
      // Fallback to demo data on error
      const product = demoProducts.find(p => p.id === productId);
      if (!product) {
        return { success: false, error: 'Product not found' };
      }
      return { success: true, product };
    }
  }

  // Make API call to GHL with timeout and retry logic
  private async makeAPICall(endpoint: string, method: string = 'GET', data: any = null, retries: number = 2) {
    const url = `${this.baseUrl}${endpoint}`;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const options: RequestInit = {
          method,
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          },
          signal: controller.signal
        };

        if (data && (method === 'POST' || method === 'PUT')) {
          options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error: any) {
        clearTimeout(timeoutId);
        
        if (attempt === retries) {
          console.error(`GHL API Call Error (attempt ${attempt + 1}/${retries + 1}):`, error);
          throw error;
        }
        
        console.warn(`GHL API Call attempt ${attempt + 1} failed, retrying...`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
      }
    }
  }
}

// Export singleton instance
export const ghlProducts = new GHLProductsIntegration();
