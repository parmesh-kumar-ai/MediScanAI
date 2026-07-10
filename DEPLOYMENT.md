# Vercel Deployment Guide for MediScan AI

## ⚠️ CRITICAL: Required Environment Variables

Your app will NOT work on Vercel without these two variables. Add them FIRST before deploying.

### Required Variables:
1. **DATABASE_URL** - PostgreSQL connection string
2. **BETTER_AUTH_SECRET** - Authentication secret (prevents "BetterAuthError")

---

## Step 1: Generate BETTER_AUTH_SECRET

Run this command to generate a secure secret:

```bash
# macOS/Linux:
openssl rand -base64 32

# Windows PowerShell:
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Copy the output - you'll need it in Step 3.

## Step 2: Set Up PostgreSQL Database

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
- AWS RDS, DigitalOcean, PlanetScale, Render, Heroku, etc.

## Step 3: Add Environment Variables to Vercel

⚠️ **DO THIS BEFORE REDEPLOYING**

1. **Go to your Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your MediScanAI project

2. **Navigate to Environment Variables**
   - Click "Settings" tab at the top
   - Click "Environment Variables" in left sidebar

3. **Add DATABASE_URL**
   - Click "Add New Variable"
   - Name: `DATABASE_URL`
   - Value: Paste your PostgreSQL connection string
   - Environments: Select all (Production, Preview, Development)
   - Click "Save"

4. **Add BETTER_AUTH_SECRET** (Required to fix BetterAuthError)
   - Click "Add New Variable"
   - Name: `BETTER_AUTH_SECRET`
   - Value: Paste the secret you generated in Step 1
   - Environments: Select all (Production, Preview, Development)
   - Click "Save"

5. **Redeploy**
   - Go to "Deployments" tab
   - Find your latest failed deployment
   - Click the three dots menu → "Redeploy"
   - Wait for deployment to complete

## ✅ Verify Success

Once deployment completes:
1. Visit your app URL
2. You should see the MediScan AI landing page with NO errors
3. Try creating an account to verify everything works

---

## Troubleshooting

### Still seeing "BetterAuthError: You are using the default secret"?

**Solution**: You haven't added `BETTER_AUTH_SECRET` to Vercel yet.
- The app can BUILD without it (we provide a fallback)
- But it WILL show this error during build
- It will still deploy, but sessions won't persist properly

**Fix**: 
1. Go to Settings → Environment Variables
2. Add `BETTER_AUTH_SECRET` (see Step 3)
3. Redeploy

### "This page couldn't load" Error?

**Most likely cause**: `DATABASE_URL` is not set or invalid

**Check these:**
1. **Verify DATABASE_URL is set**
   - Go to Settings → Environment Variables
   - Should see `DATABASE_URL` in the list

2. **Verify connection string format**
   ```
   ✅ Correct: postgresql://user:password@host:5432/database
   ❌ Wrong: mongodb://..., mysql://...
   ```

3. **Check Vercel Build Logs**
   - Go to Deployments → Failed deployment → Logs
   - Look for error messages

4. **Database accessibility**
   - Your database must be accessible from Vercel servers
   - If using cloud database, enable public internet access
   - No IP whitelisting or firewall rules blocking

### Connection Refused Error?

- Vercel can't reach your database
- Check connection string is correct
- Verify database is running and accessible
- For cloud databases, allow public access (0.0.0.0/0)

### Sessions Keep Getting Reset?

- Means `BETTER_AUTH_SECRET` is not set consistently
- Every deployment generates a new secret, invalidating old sessions
- **Fix**: Add `BETTER_AUTH_SECRET` to environment variables (Step 3)

---

## Environment Variables Checklist

Before redeploying, verify you have:

- [ ] `DATABASE_URL` set on Vercel
- [ ] `BETTER_AUTH_SECRET` set on Vercel  
- [ ] Both set for all environments (Production, Preview, Development)
- [ ] Connection string is valid PostgreSQL format
- [ ] Database is accessible from Vercel

---

## Need Help?

1. Check Vercel logs: https://vercel.com/docs/observability/logging
2. Test locally first:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your DATABASE_URL and BETTER_AUTH_SECRET
   pnpm dev
   ```
3. Verify connection string works locally before adding to Vercel
