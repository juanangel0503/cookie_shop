import { OrderData, GHLResponse } from '@/types';

export class GHLIntegration {
  private apiKey: string;
  private locationId: string;
  private pipelineId: string;
  private baseUrl: string;
  private demoMode: boolean;

  constructor() {
    // Configuration - Replace with actual values for production
    this.apiKey = process.env.GHL_API_KEY || 'YOUR_GHL_API_KEY';
    this.locationId = process.env.GHL_LOCATION_ID || 'YOUR_LOCATION_ID';
    this.pipelineId = process.env.GHL_PIPELINE_ID || 'YOUR_PIPELINE_ID';
    this.baseUrl = 'https://services.leadconnectorhq.com';
    this.demoMode = process.env.NODE_ENV === 'development' || !this.apiKey.includes('YOUR_');
  }

  // Submit order to GHL pipeline
  async submitOrder(orderData: OrderData): Promise<GHLResponse> {
    try {
      console.log('Submitting order to GHL:', orderData);
      
      // Generate order number if not provided
      if (!orderData.orderNumber) {
        orderData.orderNumber = this.generateOrderNumber();
      }

      if (this.demoMode) {
        return await this.simulateOrderSubmission(orderData);
      }

      // Create contact in GHL
      const contact = await this.createContact(orderData);
      
      // Create opportunity in pipeline
      const opportunity = await this.createOpportunity(contact.id, orderData);
      
      // Trigger workflows
      await this.triggerWorkflows(contact.id, opportunity.id, orderData);
      
      return {
        success: true,
        contactId: contact.id,
        opportunityId: opportunity.id,
        orderNumber: orderData.orderNumber,
        message: 'Order successfully submitted to GHL pipeline!'
      };
    } catch (error) {
      console.error('GHL Integration Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        orderNumber: orderData.orderNumber || this.generateOrderNumber()
      };
    }
  }

  // Generate unique order number
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `HEB-${timestamp}-${random}`;
  }

  // Simulate order submission for demo
  private async simulateOrderSubmission(orderData: OrderData): Promise<GHLResponse> {
    console.log('Demo Mode: Simulating order submission');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    const orderNumber = orderData.orderNumber || this.generateOrderNumber();
    
    return {
      success: true,
      contactId: 'demo_contact_' + Date.now(),
      opportunityId: 'demo_opp_' + Date.now(),
      orderNumber: orderNumber,
      message: 'Demo: Order successfully submitted! (In production, this would create a GHL contact and opportunity)'
    };
  }

  // Create contact in GHL
  private async createContact(orderData: OrderData) {
    const contactData = {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phone: orderData.phone,
      address1: orderData.deliveryAddress,
      city: orderData.city,
      postalCode: orderData.zipCode,
      customFields: [
        {
          key: 'delivery_date',
          value: orderData.deliveryDate || ''
        },
        {
          key: 'special_instructions',
          value: orderData.specialInstructions || ''
        },
        {
          key: 'order_number',
          value: orderData.orderNumber
        },
        {
          key: 'total_items',
          value: orderData.totalItems.toString()
        },
        {
          key: 'total_value',
          value: orderData.totalValue.toFixed(2)
        }
      ]
    };

    const response = await this.makeAPICall('/contacts/', 'POST', contactData);
    return response.contact;
  }

  // Create opportunity in pipeline
  private async createOpportunity(contactId: string, orderData: OrderData) {
    const opportunityData = {
      contactId: contactId,
      pipelineId: this.pipelineId,
      stageId: this.getStageId('New Order'), // First stage in pipeline
      name: `Cookie Order - ${orderData.orderNumber}`,
      monetaryValue: orderData.totalValue,
      customFields: [
        {
          key: 'order_items',
          value: JSON.stringify(orderData.items)
        },
        {
          key: 'delivery_date',
          value: orderData.deliveryDate || ''
        },
        {
          key: 'special_instructions',
          value: orderData.specialInstructions || ''
        },
        {
          key: 'order_number',
          value: orderData.orderNumber
        }
      ]
    };

    const response = await this.makeAPICall('/opportunities/', 'POST', opportunityData);
    return response.opportunity;
  }

  // Trigger automated workflows
  private async triggerWorkflows(contactId: string, opportunityId: string, orderData: OrderData) {
    const workflows = [
      'order_confirmation_email',
      'internal_order_notification'
    ];

    for (const workflowName of workflows) {
      try {
        await this.triggerWorkflow(workflowName, {
          contactId,
          opportunityId,
          orderData
        });
      } catch (error) {
        console.error(`Failed to trigger workflow ${workflowName}:`, error);
      }
    }
  }

  // Trigger specific workflow
  private async triggerWorkflow(workflowName: string, data: any) {
    const workflowData = {
      workflowName,
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      customData: {
        orderNumber: data.orderData.orderNumber,
        customerName: `${data.orderData.firstName} ${data.orderData.lastName}`,
        totalItems: data.orderData.totalItems,
        totalValue: data.orderData.totalValue,
        deliveryAddress: data.orderData.deliveryAddress,
        specialInstructions: data.orderData.specialInstructions
      }
    };

    return await this.makeAPICall('/workflows/trigger/', 'POST', workflowData);
  }

  // Get stage ID by name
  private getStageId(stageName: string): string {
    const stages: Record<string, string> = {
      'New Order': 'stage_1',
      'Processing': 'stage_2',
      'Baking': 'stage_3',
      'Ready for Delivery': 'stage_4',
      'Delivered': 'stage_5',
      'Completed': 'stage_6'
    };
    return stages[stageName] || 'stage_1';
  }

  // Make API call to GHL
  private async makeAPICall(endpoint: string, method: string = 'GET', data: any = null) {
    if (this.demoMode) {
      return await this.simulateAPICall(endpoint, method, data);
    }

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
      console.error('API Call Error:', error);
      throw error;
    }
  }

  // Simulate API call for demo purposes
  private async simulateAPICall(endpoint: string, method: string = 'GET', data: any = null) {
    console.log(`Demo: Simulating ${method} call to ${endpoint}:`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock response based on endpoint
    if (endpoint.includes('/contacts/')) {
      return {
        contact: {
          id: 'contact_' + Date.now(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        }
      };
    } else if (endpoint.includes('/opportunities/')) {
      return {
        opportunity: {
          id: 'opp_' + Date.now(),
          contactId: data.contactId,
          name: data.name,
          monetaryValue: data.monetaryValue
        }
      };
    } else if (endpoint.includes('/workflows/trigger/')) {
      return {
        success: true,
        workflowId: 'workflow_' + Date.now()
      };
    }
    
    return { success: true };
  }
}

// Export singleton instance
export const ghlIntegration = new GHLIntegration();
