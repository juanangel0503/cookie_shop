import { NextRequest, NextResponse } from 'next/server';
import { ghlProducts } from '@/lib/ghl-products';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let result;
    if (category) {
      result = await ghlProducts.getProductsByCategory(category);
    } else {
      result = await ghlProducts.getProducts();
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
