#!/bin/bash

echo "🍪 Setting up Happily Ever Bakers Next.js Project..."

# Check Node.js version
echo "📋 Checking Node.js version..."
node --version

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed successfully!"
    echo "🚀 You can now run: npm run dev"
else
    echo "❌ Installation failed. Trying alternative approach..."
    echo "📦 Installing with legacy peer deps..."
    npm install --legacy-peer-deps
fi

echo "🎉 Setup complete!"
