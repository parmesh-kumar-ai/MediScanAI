#!/bin/bash
# Script to generate a secure BETTER_AUTH_SECRET and display setup instructions

echo "🔐 MediScan AI - Vercel Environment Setup"
echo "=========================================="
echo ""

# Generate secure secret
if command -v openssl &> /dev/null; then
    SECRET=$(openssl rand -base64 32)
    echo "✅ Generated secure secret:"
    echo ""
    echo "BETTER_AUTH_SECRET=$SECRET"
    echo ""
else
    echo "⚠️  OpenSSL not found. Using default approach..."
    SECRET="your-secure-secret-generated-here"
fi

echo "📋 Setup Instructions:"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your MediScanAI project"
echo "3. Click Settings → Environment Variables"
echo "4. Click 'Add New Variable'"
echo "5. Name: BETTER_AUTH_SECRET"
echo "6. Value: $SECRET"
echo "7. Environments: Select all (Production, Preview, Development)"
echo "8. Click Save"
echo "9. Go to Deployments → Redeploy latest"
echo ""
echo "✅ Done! Your app will deploy without BetterAuth errors."
