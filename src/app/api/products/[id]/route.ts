import { NextRequest, NextResponse } from 'next/server';
import { ghlProducts } from '@/lib/ghl-products';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await ghlProducts.getProduct(params.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Product API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
