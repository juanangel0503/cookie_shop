import { NextRequest, NextResponse } from 'next/server';
import { ghlIntegration } from '@/lib/ghl-integration';
import { OrderData, ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    
    // Validate required fields
    if (!orderData.firstName || !orderData.lastName || !orderData.email || !orderData.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' } as ApiResponse<null>,
        { status: 400 }
      );
    }

    // Submit order to GHL
    const result = await ghlIntegration.submitOrder(orderData);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, data: result } as ApiResponse<typeof result>,
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to submit order' } as ApiResponse<null>,
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
