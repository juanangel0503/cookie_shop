import { NextRequest, NextResponse } from 'next/server';
import { GHLProductsIntegration } from '@/lib/ghl-products';
import { cookieFlavors } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const ghlService = new GHLProductsIntegration();
    const result = await ghlService.getProducts();
    
    if (result.success && result.products) {
      // Filter for cookie-related products and transform to cookie flavors format
      const cookieProducts = result.products.filter(product => {
        const name = product.name.toLowerCase();
        const description = product.description?.toLowerCase() || '';
        const category = product.category?.toLowerCase() || '';
        
        // Look for cookie-related keywords
        return name.includes('cookie') || 
               name.includes('biscuit') ||
               description.includes('cookie') ||
               description.includes('biscuit') ||
               category.includes('cookie') ||
               category.includes('dessert') ||
               category.includes('sweet');
      });
      
      if (cookieProducts.length > 0) {
        const flavors = cookieProducts.map((product, index) => ({
          id: index + 1,
          name: product.name,
          description: product.description,
          category: product.category?.toLowerCase() as 'chocolate' | 'classic' | 'fruity' | 'seasonal' || 'classic',
          emoji: "🍪",
          calories: product.customFields?.calories || "600 cal",
          surcharge: product.customFields?.surcharge
        }));
        
        return NextResponse.json({
          success: true,
          flavors
        });
      }
    }
    
    // Fallback to demo data if no cookie products found or API failed
    return NextResponse.json({
      success: true,
      flavors: cookieFlavors
    });
    
  } catch (error) {
    console.error('Flavors API Error:', error);
    
    // Fallback to demo data on error
    return NextResponse.json({
      success: true,
      flavors: cookieFlavors
    });
  }
}
