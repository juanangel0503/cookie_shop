import { GHLProduct, GHLProductResponse, ProductCategory } from '@/types';

export class GHLProductsIntegration {
  private apiKey: string;
  private locationId: string;
  private baseUrl: string;
  private demoMode: boolean;

  constructor() {
    this.apiKey = process.env.GHL_API_KEY || 'YOUR_GHL_API_KEY';
    this.locationId = process.env.GHL_LOCATION_ID || 'YOUR_LOCATION_ID';
    this.baseUrl = 'https://services.leadconnectorhq.com';
    // Demo unless both credentials look real
    const hasRealKey = !!process.env.GHL_API_KEY && !this.apiKey.startsWith('YOUR');
    const hasRealLoc = !!process.env.GHL_LOCATION_ID && !this.locationId.startsWith('YOUR');
    this.demoMode = !(hasRealKey && hasRealLoc);
  }

  // Fetch all products from GHL
  async getProducts(): Promise<GHLProductResponse> {
    try {
      if (this.demoMode) {
        return await this.getDemoProducts();
      }

      const response = await this.makeAPICall('/products/', 'GET');
      
      return {
        success: true,
        products: response.products || []
      };
    } catch (error) {
      console.error('GHL Products Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      };
    }
  }

  // Fetch products by category
  async getProductsByCategory(categoryId: string): Promise<GHLProductResponse> {
    try {
      if (this.demoMode) {
        return await this.getDemoProductsByCategory(categoryId);
      }

      const response = await this.makeAPICall(`/products/?category=${categoryId}`, 'GET');
      
      return {
        success: true,
        products: response.products || []
      };
    } catch (error) {
      console.error('GHL Products by Category Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products by category'
      };
    }
  }

  // Fetch product categories
  async getCategories(): Promise<{ success: boolean; categories?: ProductCategory[]; error?: string }> {
    try {
      if (this.demoMode) {
        return await this.getDemoCategories();
      }

      const response = await this.makeAPICall('/product-categories/', 'GET');
      
      return {
        success: true,
        categories: response.categories || []
      };
    } catch (error) {
      console.error('GHL Categories Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories'
      };
    }
  }

  // Get single product by ID
  async getProduct(productId: string): Promise<{ success: boolean; product?: GHLProduct; error?: string }> {
    try {
      if (this.demoMode) {
        return await this.getDemoProduct(productId);
      }

      const response = await this.makeAPICall(`/products/${productId}`, 'GET');
      
      return {
        success: true,
        product: response.product
      };
    } catch (error) {
      console.error('GHL Product Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product'
      };
    }
  }

  // Demo products for development
  private async getDemoProducts(): Promise<GHLProductResponse> {
    console.log('Demo Mode: Returning mock products');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoProducts: GHLProduct[] = [
      {
        id: 'prod_1',
        name: 'Chocolate Chip Cookie',
        description: 'Classic chocolate chip cookie with premium ingredients',
        price: 4.99,
        category: 'cookies',
        image: '/images/products/chocolate-chip.jpg',
        sku: 'CC-001',
        stock: 50,
        isActive: true,
        customFields: {
          calories: '650 cal',
          category: 'chocolate'
        }
      },
      {
        id: 'prod_2',
        name: 'Vanilla Sugar Cookie',
        description: 'Buttery soft sugar cookies with real vanilla extract',
        price: 4.99,
        category: 'cookies',
        image: '/images/products/vanilla-sugar.jpg',
        sku: 'VSC-001',
        stock: 30,
        isActive: true,
        customFields: {
          calories: '600 cal',
          category: 'classic'
        }
      },
      {
        id: 'prod_3',
        name: '4-Pack Cookie Box',
        description: 'Assorted cookie 4-pack with variety of flavors',
        price: 18.99,
        category: 'packs',
        image: '/images/products/4-pack.jpg',
        sku: '4PK-001',
        stock: 25,
        isActive: true,
        customFields: {
          savings: 'Save 49%',
          size: '4-pack'
        }
      },
      {
        id: 'prod_4',
        name: '6-Pack Cookie Box',
        description: 'Premium 6-pack with gourmet cookie selection',
        price: 24.99,
        category: 'packs',
        image: '/images/products/6-pack.jpg',
        sku: '6PK-001',
        stock: 20,
        isActive: true,
        customFields: {
          savings: 'Save 36%',
          size: '6-pack'
        }
      },
      {
        id: 'prod_5',
        name: '12-Pack Cookie Box',
        description: 'Family size 12-pack with mixed flavors',
        price: 48.99,
        category: 'packs',
        image: '/images/products/12-pack.jpg',
        sku: '12PK-001',
        stock: 15,
        isActive: true,
        customFields: {
          savings: 'Save 18%',
          size: '12-pack'
        }
      }
    ];

    return {
      success: true,
      products: demoProducts
    };
  }

  // Demo products by category
  private async getDemoProductsByCategory(categoryId: string): Promise<GHLProductResponse> {
    const allProducts = await this.getDemoProducts();
    if (!allProducts.success || !allProducts.products) {
      return allProducts;
    }

    const filteredProducts = allProducts.products.filter(
      product => product.category === categoryId
    );

    return {
      success: true,
      products: filteredProducts
    };
  }

  // Demo categories
  private async getDemoCategories(): Promise<{ success: boolean; categories?: ProductCategory[]; error?: string }> {
    console.log('Demo Mode: Returning mock categories');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const demoCategories: ProductCategory[] = [
      {
        id: 'cat_1',
        name: 'Cookies',
        description: 'Individual cookie flavors'
      },
      {
        id: 'cat_2',
        name: 'Packs',
        description: 'Multi-cookie packages'
      },
      {
        id: 'cat_3',
        name: 'Seasonal',
        description: 'Limited time seasonal flavors'
      }
    ];

    return {
      success: true,
      categories: demoCategories
    };
  }

  // Demo single product
  private async getDemoProduct(productId: string): Promise<{ success: boolean; product?: GHLProduct; error?: string }> {
    const allProducts = await this.getDemoProducts();
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
  }

  // Make API call to GHL
  private async makeAPICall(endpoint: string, method: string = 'GET', data: any = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GHL API Call Error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const ghlProducts = new GHLProductsIntegration();
