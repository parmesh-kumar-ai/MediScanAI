# Vercel Deployment Guide for MediScan AI

## Quick Start

Your deployment failed because the `DATABASE_URL` environment variable is not configured. Follow these steps to fix it:

## Step 1: Set Up PostgreSQL Database

Choose one of these options:

### Option A: Vercel Postgres (Recommended - Fastest)
1. Go to https://vercel.com/storage
2. Click "Connect Store"
3. Create a new Postgres database
4. Copy the full connection string from the credentials

### Option B: Supabase (Popular Alternative)
1. Sign up at https://supabase.com
2. Create a new project
3. Go to Project Settings → Database → Connection strings
4. Copy the "Full connection string" (postgres:// format)

### Option C: Railway.app (Simple & Affordable)
1. Sign up at https://railway.app
2. Create new project → PostgreSQL
3. Click the PostgreSQL instance
4. Find the connection URL in the Connect tab

### Option D: Other Providers
- PlanetScale (MySQL-compatible)
- AWS RDS (PostgreSQL)
- DigitalOcean (Managed Database)
- Railway, Render, Heroku, etc.

## Step 2: Add Environment Variables to Vercel

1. **Go to your Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your MediScanAI project

2. **Navigate to Settings**
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

3. **Add the Database URL**
   - Name: `DATABASE_URL`
   - Value: Paste your complete PostgreSQL connection string
   - Environments: Select all (Production, Preview, Development)
   - Click "Save"

4. **Add the Authentication Secret** (IMPORTANT for Production)
   - Name: `BETTER_AUTH_SECRET`
   - Value: Generate a secure random string:
     ```bash
     # On macOS/Linux:
     openssl rand -base64 32
     
     # On Windows (PowerShell):
     [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
     ```
   - Paste the generated value
   - Environments: Select all
   - Click "Save"
   
   **Note**: The app will generate a temporary secret during development and build, but for production security, you MUST set this explicitly.

5. **Redeploy**
   - Go to "Deployments" tab
   - Find your latest failed deployment
   - Click the three dots menu
   - Select "Redeploy"
   - Wait for deployment to complete

## Step 3: Verify Deployment

1. Once deployment succeeds, visit your app URL
2. You should see the MediScan AI landing page
3. Try creating an account to verify the database is working

## Troubleshooting

### BetterAuthError: "You are using the default secret"

This warning appears during build if `BETTER_AUTH_SECRET` is not set. While it won't prevent deployment:
- It will use a temporary secret during build
- **For production**: You MUST set `BETTER_AUTH_SECRET` in environment variables
- User sessions from development won't work in production
- Sessions from preview deployments will be invalidated

**Fix**: Add `BETTER_AUTH_SECRET` to Vercel environment variables (see Step 2 above)

### Still Getting "This page couldn't load"?

1. **Check Vercel Logs**
   - Go to Deployments → Latest deployment → Logs
   - Look for any error messages
   - Common issues: `DATABASE_URL not set` or `BetterAuthError`

2. **Verify Connection String**
   ```
   ✅ Correct format: postgresql://user:password@host:5432/database
   ❌ Wrong format: mongodb://..., mysql://...
   ```

3. **Check Database Accessibility**
   - Your database server must be accessible from Vercel
   - Cloud databases need public internet access enabled
   - No IP whitelisting or firewall blocking Vercel IPs

4. **Test Connection Locally**
   ```bash
   # Add to .env.local
   DATABASE_URL=your_connection_string
   
   # Run locally to verify
   pnpm dev
   ```

### Connection Refused Error?

This means Vercel can't connect to your database:
- Check if the connection string is correct
- Verify the database is running
- Check firewall rules (allow all IPs: 0.0.0.0/0)
- Use a database provider with public internet access

### Database Schema Not Created?

After confirming DATABASE_URL is working:
1. From your local machine, run:
   ```bash
   DATABASE_URL="your_connection_string" pnpm db:push
   ```
2. This creates all required tables

## Monitoring Your Deployment

- **Vercel Logs**: Check `https://vercel.com/dashboard/project/[project-id]/logs`
- **Database Connection**: Look for connection errors
- **Build Logs**: Check if any environment variables are missing

## Next Steps

1. ✅ Database is connected - your app should now work!
2. Configure custom domain (optional)
3. Set up automatic deployments on git push
4. Monitor analytics on Vercel dashboard

## Need Help?

- Check Vercel documentation: https://vercel.com/docs
- Check database provider documentation
- Review error logs in Vercel dashboard
- Verify connection string format in .env.example
