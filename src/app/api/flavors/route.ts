import { NextRequest, NextResponse } from 'next/server';
import { GHLProductsIntegration } from '@/lib/ghl-products';
import { cookieFlavors } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const ghlService = new GHLProductsIntegration();
    const result = await ghlService.getProducts();
    
    if (result.success && result.products) {
      // Transform GHL products to cookie flavors format
      const flavors = result.products.map((product, index) => ({
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
    
    // Fallback to demo data
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
