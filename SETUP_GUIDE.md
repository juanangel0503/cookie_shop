# Happily Ever Bakers - GHL Integration Setup Guide

This guide will help you set up the Go High Level integration for your Happily Ever Bakers cookie shop website.

## Prerequisites

- Go High Level account with API access
- Website hosting (can be GHL's website builder or external hosting)
- Basic understanding of GHL workflows and pipelines

## Step 1: Deploy Website Files

1. Upload all website files to your hosting platform:
   - `index.html` - Main cookie shop page
   - `checkout.html` - Order form and checkout
   - `styles.css` - Professional styling
   - `script.js` - Product catalog and cart functionality
   - `checkout.js` - Order processing
   - `ghl-integration.js` - GHL API integration

## Step 2: Configure GHL Pipeline

1. **Create Pipeline:**
   - Go to GHL → Opportunities → Pipelines
   - Create new pipeline: "Cookie Orders Pipeline"
   - Add the 6 stages from `workflows/pipeline-setup.json`:
     - New Order
     - Processing
     - Baking
     - Ready for Delivery
     - Delivered
     - Completed

2. **Get Pipeline ID:**
   - Copy the pipeline ID for use in configuration

## Step 3: Set Up API Integration

1. **Get API Credentials:**
   - Go to GHL → Settings → API
   - Generate API key
   - Get your Location ID

2. **Update Configuration:**
   - Edit `ghl-integration.js`
   - Replace placeholder values:
     ```javascript
     this.apiKey = 'YOUR_ACTUAL_API_KEY';
     this.locationId = 'YOUR_ACTUAL_LOCATION_ID';
     this.pipelineId = 'YOUR_ACTUAL_PIPELINE_ID';
     ```

## Step 4: Create Workflows

### Order Confirmation Workflow
1. Go to GHL → Workflows
2. Create new workflow: "Order Confirmation Email"
3. Set trigger: "Opportunity Created"
4. Add condition: Pipeline ID equals your pipeline ID
5. Add action: Send Email
6. Use the template from `workflows/order-confirmation-workflow.json`

### Internal Notification Workflow
1. Create workflow: "Internal Order Notification"
2. Set trigger: "Opportunity Created"
3. Add condition: Pipeline ID equals your pipeline ID
4. Add actions:
   - Send Email to your team email
   - Send SMS to your phone number
5. Use template from `workflows/internal-notification-workflow.json`

### Stage Update Workflows
1. Create workflow: "Pipeline Stage Updates"
2. Set trigger: "Opportunity Stage Changed"
3. Add condition: Pipeline ID equals your pipeline ID
4. Add action: Send Email to customer
5. Use templates from `workflows/stage-update-workflow.json`

## Step 5: Create Email Templates

1. Go to GHL → Settings → Email Templates
2. Create templates using the HTML from the workflow JSON files:
   - `order_confirmation`
   - `internal_order_notification`
   - `stage_update`
   - `processing_update`
   - `baking_update`
   - `ready_for_delivery_update`
   - `delivery_confirmation`
   - `order_completion`

## Step 6: Test the Flow

1. **Test Product Browsing:**
   - Visit your website
   - Browse products
   - Add items to cart
   - Verify cart functionality

2. **Test Order Submission:**
   - Fill out order form
   - Submit order
   - Check GHL pipeline for new opportunity
   - Verify workflows triggered

3. **Test Pipeline Updates:**
   - Manually move opportunity through stages
   - Verify customer receives update emails
   - Check internal notifications

## Step 7: Customize for Your Business

1. **Update Product Catalog:**
   - Edit `script.js` to add your actual products
   - Update prices, descriptions, and categories
   - Add product images

2. **Customize Branding:**
   - Update colors in `styles.css`
   - Change logo and business name
   - Update contact information

3. **Modify Workflows:**
   - Adjust email templates
   - Update notification recipients
   - Customize pipeline stages

## Troubleshooting

### Common Issues:

1. **API Integration Not Working:**
   - Verify API key and location ID
   - Check API permissions
   - Test API calls in GHL API documentation

2. **Workflows Not Triggering:**
   - Verify pipeline ID in workflow conditions
   - Check workflow is enabled
   - Test with manual opportunity creation

3. **Emails Not Sending:**
   - Verify email templates exist
   - Check email deliverability settings
   - Test with simple email first

### Support:

- Check GHL documentation for API details
- Test workflows in GHL's workflow builder
- Use browser developer tools to debug JavaScript

## Demo Features

✅ **Product Browsing:** Browse cookie varieties with filtering
✅ **Add to Box:** Select multiple cookies with quantity control
✅ **Order Summary:** Review selected items before checkout
✅ **Order Form:** Submit orders without online payment
✅ **GHL Integration:** Orders flow into GHL pipeline
✅ **Automated Workflows:** Email notifications and updates
✅ **Pipeline Tracking:** Track orders through stages
✅ **Mobile Responsive:** Works on all devices

## Next Steps

1. Test the complete flow
2. Customize for your business
3. Train your team on pipeline management
4. Set up additional workflows as needed
5. Monitor and optimize based on customer feedback

This demo replicates Crumbl's ordering flow while integrating seamlessly with Go High Level for order management and customer communication.
