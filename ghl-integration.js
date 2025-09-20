// Go High Level Integration
// This file handles the integration with GHL APIs for order processing

class GHLIntegration {
    constructor() {
        this.apiKey = 'YOUR_GHL_API_KEY'; // Replace with actual API key
        this.locationId = 'YOUR_LOCATION_ID'; // Replace with actual location ID
        this.pipelineId = 'YOUR_PIPELINE_ID'; // Replace with actual pipeline ID
        this.baseUrl = 'https://services.leadconnectorhq.com';
    }

    // Submit order to GHL pipeline
    async submitOrder(orderData) {
        try {
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
                orderNumber: orderData.orderNumber
            };
        } catch (error) {
            console.error('GHL Integration Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Create contact in GHL
    async createContact(orderData) {
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
    async createOpportunity(contactId, orderData) {
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
                }
            ]
        };

        const response = await this.makeAPICall('/opportunities/', 'POST', opportunityData);
        return response.opportunity;
    }

    // Trigger automated workflows
    async triggerWorkflows(contactId, opportunityId, orderData) {
        const workflows = [
            'order_confirmation_email',
            'internal_order_notification',
            'pipeline_stage_update'
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
    async triggerWorkflow(workflowName, data) {
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

    // Update pipeline stage
    async updatePipelineStage(opportunityId, stageName) {
        const stageId = this.getStageId(stageName);
        const updateData = {
            stageId: stageId
        };

        return await this.makeAPICall(`/opportunities/${opportunityId}`, 'PUT', updateData);
    }

    // Get stage ID by name
    getStageId(stageName) {
        const stages = {
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
    async makeAPICall(endpoint, method = 'GET', data = null) {
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
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
    async simulateAPICall(endpoint, method = 'GET', data = null) {
        console.log(`Simulating ${method} call to ${endpoint}:`, data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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

// Workflow configurations for GHL
const GHLWorkflows = {
    // Order confirmation email workflow
    orderConfirmationEmail: {
        name: 'Order Confirmation Email',
        trigger: 'opportunity_created',
        conditions: [
            {
                field: 'pipeline_id',
                operator: 'equals',
                value: 'YOUR_PIPELINE_ID'
            }
        ],
        actions: [
            {
                type: 'send_email',
                template: 'order_confirmation',
                to: '{{contact.email}}',
                subject: 'Order Confirmed - Happily Ever Bakers',
                variables: {
                    customer_name: '{{contact.firstName}}',
                    order_number: '{{opportunity.customFields.order_number}}',
                    total_items: '{{opportunity.customFields.total_items}}',
                    total_value: '{{opportunity.customFields.total_value}}'
                }
            }
        ]
    },

    // Internal notification workflow
    internalOrderNotification: {
        name: 'Internal Order Notification',
        trigger: 'opportunity_created',
        conditions: [
            {
                field: 'pipeline_id',
                operator: 'equals',
                value: 'YOUR_PIPELINE_ID'
            }
        ],
        actions: [
            {
                type: 'send_email',
                to: 'orders@happilyeverbakers.com',
                subject: 'New Cookie Order Received',
                template: 'internal_order_notification',
                variables: {
                    customer_name: '{{contact.firstName}} {{contact.lastName}}',
                    customer_email: '{{contact.email}}',
                    customer_phone: '{{contact.phone}}',
                    order_number: '{{opportunity.customFields.order_number}}',
                    total_items: '{{opportunity.customFields.total_items}}',
                    total_value: '{{opportunity.customFields.total_value}}',
                    delivery_address: '{{contact.address1}}',
                    special_instructions: '{{opportunity.customFields.special_instructions}}'
                }
            },
            {
                type: 'send_sms',
                to: '+1234567890', // Owner's phone number
                message: 'New cookie order received! Check your email for details.'
            }
        ]
    },

    // Pipeline stage update workflow
    pipelineStageUpdate: {
        name: 'Pipeline Stage Updates',
        trigger: 'opportunity_stage_changed',
        conditions: [
            {
                field: 'pipeline_id',
                operator: 'equals',
                value: 'YOUR_PIPELINE_ID'
            }
        ],
        actions: [
            {
                type: 'send_email',
                to: '{{contact.email}}',
                subject: 'Order Update - Happily Ever Bakers',
                template: 'order_status_update',
                variables: {
                    customer_name: '{{contact.firstName}}',
                    order_number: '{{opportunity.customFields.order_number}}',
                    current_stage: '{{opportunity.stage.name}}',
                    next_steps: '{{opportunity.stage.description}}'
                }
            }
        ]
    }
};

// Email templates for workflows
const EmailTemplates = {
    orderConfirmation: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #8B4513; color: white; padding: 20px; text-align: center;">
                <h1>🍪 Happily Ever Bakers</h1>
            </div>
            <div style="padding: 30px;">
                <h2>Order Confirmed!</h2>
                <p>Dear {{customer_name}},</p>
                <p>Thank you for your order! We're excited to bake your delicious cookies.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3>Order Details</h3>
                    <p><strong>Order Number:</strong> {{order_number}}</p>
                    <p><strong>Total Items:</strong> {{total_items}}</p>
                    <p><strong>Total Value:</strong> ${{total_value}}</p>
                </div>
                
                <p><strong>What's Next?</strong></p>
                <ul>
                    <li>📧 You'll receive an invoice for payment</li>
                    <li>🍪 We'll start baking your fresh cookies</li>
                    <li>📦 You'll get updates as your order progresses</li>
                </ul>
                
                <p>If you have any questions, please don't hesitate to contact us.</p>
                <p>Best regards,<br>The Happily Ever Bakers Team</p>
            </div>
        </body>
        </html>
    `,

    internalOrderNotification: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Cookie Order Received</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {{customer_name}}</p>
                <p><strong>Email:</strong> {{customer_email}}</p>
                <p><strong>Phone:</strong> {{customer_phone}}</p>
                <p><strong>Delivery Address:</strong> {{delivery_address}}</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>Order Information</h3>
                <p><strong>Order Number:</strong> {{order_number}}</p>
                <p><strong>Total Items:</strong> {{total_items}}</p>
                <p><strong>Total Value:</strong> ${{total_value}}</p>
                <p><strong>Special Instructions:</strong> {{special_instructions}}</p>
            </div>
            
            <p>Please process this order in your GHL pipeline.</p>
        </body>
        </html>
    `,

    orderStatusUpdate: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #8B4513; color: white; padding: 20px; text-align: center;">
                <h1>🍪 Happily Ever Bakers</h1>
            </div>
            <div style="padding: 30px;">
                <h2>Order Update</h2>
                <p>Dear {{customer_name}},</p>
                <p>Your order #{{order_number}} has been updated!</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3>Current Status: {{current_stage}}</h3>
                    <p>{{next_steps}}</p>
                </div>
                
                <p>Thank you for choosing Happily Ever Bakers!</p>
            </div>
        </body>
        </html>
    `
};

// Initialize GHL integration
const ghlIntegration = new GHLIntegration();

// Export for use in other files
window.GHLIntegration = GHLIntegration;
window.ghlIntegration = ghlIntegration;
window.GHLWorkflows = GHLWorkflows;
window.EmailTemplates = EmailTemplates;
