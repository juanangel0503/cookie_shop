# Happily Ever Bakers - Next.js E-Commerce System

A modern, full-stack e-commerce application built with Next.js 14, TypeScript, and Go High Level integration for a "order now, invoice later" cookie shop experience.

## 🚀 Features

### Frontend
- **Modern React Architecture**: Built with Next.js 14 and TypeScript
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Search & Filtering**: Advanced product browsing with instant search
- **Interactive Cart**: Persistent cart with real-time updates
- **Form Validation**: Comprehensive client-side validation
- **Professional UI**: Clean, modern interface matching Crumbl Cookies experience

### Backend
- **API Routes**: Server-side order processing with Next.js API routes
- **GHL Integration**: Complete Go High Level API integration
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Robust error handling and user feedback
- **Demo Mode**: Works without API credentials for development

### E-Commerce Features
- **Pack-Based Ordering**: Single, 4-Pack, 6-Pack, and 12-Pack options
- **Custom Cookie Selection**: Choose specific flavors for each pack
- **Order Management**: Complete order flow from selection to submission
- **GHL Pipeline Integration**: Orders flow into GHL pipeline automatically
- **Workflow Automation**: Automated email notifications and updates

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Context API
- **API Integration**: Go High Level REST API
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
cookie_shop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── orders/        # Order submission endpoint
│   │   ├── checkout/          # Checkout page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   └── CartSidebar.tsx    # Shopping cart sidebar
│   ├── lib/                   # Utility libraries
│   │   ├── cart-context.tsx   # Cart state management
│   │   ├── data.ts            # Product data
│   │   └── ghl-integration.ts # GHL API integration
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Type definitions
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Go High Level account (for production)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   GHL_API_KEY=your_ghl_api_key_here
   GHL_LOCATION_ID=your_location_id_here
   GHL_PIPELINE_ID=your_pipeline_id_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Development Mode
The application runs in demo mode by default when:
- `NODE_ENV` is set to `development`
- GHL API credentials are not configured
- API key contains placeholder values

### Production Mode
To enable production mode:
1. Set up your GHL API credentials in `.env.local`
2. Ensure `NODE_ENV` is set to `production`
3. Deploy to your hosting platform

## 📱 Usage

### For Customers
1. **Browse Products**: Use search and filters to find cookie flavors
2. **Select Pack Size**: Choose from Single, 4-Pack, 6-Pack, or 12-Pack
3. **Customize Selection**: Pick specific flavors for your pack
4. **Add to Cart**: Review and add packs to your cart
5. **Checkout**: Fill out delivery information and submit order
6. **Order Confirmation**: Receive confirmation and order number

### For Administrators
1. **Monitor Orders**: Check GHL pipeline for new orders
2. **Process Orders**: Move orders through pipeline stages
3. **Customer Communication**: Automated emails keep customers informed
4. **Order Management**: Complete order tracking from submission to delivery

## 🔌 API Integration

### GHL Integration
The application integrates with Go High Level for:
- **Contact Creation**: Automatic customer contact creation
- **Opportunity Management**: Orders flow into GHL pipeline
- **Workflow Automation**: Automated email notifications
- **Custom Fields**: Order details stored in GHL custom fields

### API Endpoints
- `POST /api/orders` - Submit new order to GHL

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update CSS variables in `:root` for color scheme
- Customize component styles as needed

### Product Catalog
- Edit `src/lib/data.ts` to modify cookie flavors and pack options
- Update pricing, descriptions, and categories
- Add new product categories and filters

### GHL Configuration
- Update `src/lib/ghl-integration.ts` for API configuration
- Modify workflow triggers and email templates
- Customize pipeline stages and custom fields

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables
4. Set up reverse proxy if needed

## 🧪 Testing

### Development Testing
1. Run in development mode: `npm run dev`
2. Test complete order flow
3. Verify GHL integration (demo mode)
4. Check responsive design on different devices

### Production Testing
1. Configure GHL API credentials
2. Test order submission
3. Verify GHL pipeline integration
4. Check email notifications

## 📊 Performance

### Optimizations
- **Server-Side Rendering**: Next.js SSR for better SEO
- **Code Splitting**: Automatic code splitting for faster loading
- **Image Optimization**: Next.js Image component for optimized images
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

### Monitoring
- Monitor Core Web Vitals
- Track conversion rates
- Monitor API response times
- Check error rates and user feedback

## 🔒 Security

### Best Practices
- Environment variables for sensitive data
- Input validation and sanitization
- HTTPS in production
- Regular dependency updates

### GHL Security
- Secure API key storage
- Rate limiting for API calls
- Error handling without exposing sensitive data

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors: `npm run build`
- Verify all imports and exports
- Check environment variable configuration

**API Integration Issues**
- Verify GHL API credentials
- Check network connectivity
- Review API response logs

**Styling Issues**
- Check CSS class names
- Verify responsive breakpoints
- Test in different browsers

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📈 Roadmap

### Planned Features
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Inventory management
- [ ] Advanced analytics
- [ ] Multi-language support

### Performance Improvements
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Database integration
- [ ] Real-time updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the documentation
- Open an issue on GitHub
- Contact the development team

## 🎉 Acknowledgments

- Built with Next.js and React
- Integrated with Go High Level
- Inspired by Crumbl Cookies user experience
- Designed for Happily Ever Bakers

---

**Happy Baking! 🍪**

## 🔧 Troubleshooting Installation

### Node.js Version Compatibility
If you encounter version conflicts during installation:

1. **Check your Node.js version:**
   ```bash
   node --version
   ```

2. **Use the setup script:**
   ```bash
   ./setup.sh
   ```

3. **Manual installation with legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Alternative: Use exact versions:**
   ```bash
   npm install --save-exact
   ```

### Common Issues

**TypeScript Version Conflicts:**
- The project uses TypeScript ^5.0.0
- If you get version conflicts, try: `npm install typescript@latest`

**Node.js v24 Compatibility:**
- This project is tested with Node.js v18+ and v24
- If you encounter issues, try using Node.js v18 LTS

**Network Issues:**
- Clear npm cache: `npm cache clean --force`
- Use different registry: `npm install --registry https://registry.npmjs.org/`

