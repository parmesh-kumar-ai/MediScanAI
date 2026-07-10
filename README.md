# MediScan AI - Advanced Medical Diagnosis System

An AI-powered health platform featuring symptom-based disease prediction, diagnostic report analysis, and personalized dietary recommendations.

## Features

- **Symptom Analysis**: Select from 41 clinical symptoms and get AI-powered probability distribution across 34 diseases
- **Report Analyzer**: Upload medical reports (PDF/images) for OCR-based analysis and AI summaries
- **Dietary Plans**: Disease-specific nutrition recommendations with macro breakdowns
- **Health Dashboard**: Track medical history and past analyses
- **Secure Authentication**: User accounts with password-protected access

## Tech Stack

- **Framework**: Next.js 16+ with TypeScript
- **Frontend**: React 19, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API routes with Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth
- **AI**: Vercel AI SDK
- **Analytics**: Vercel Analytics

## Prerequisites

- Node.js 18+ 
- pnpm package manager
- PostgreSQL database (local or cloud)
- Vercel account (for deployment)

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/parmesh-kumar-ai/MediScanAI.git
   cd MediScanAI
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/mediscan
   ```

4. **Initialize the database**
   ```bash
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000`

## Deployment to Vercel

### Step 1: Create a PostgreSQL Database

You need a PostgreSQL database. Choose one of these options:

**Option A: Vercel Postgres** (Recommended)
- Go to https://vercel.com/storage
- Click "Connect Store" → Create a new Postgres database
- Copy the `POSTGRES_URL` connection string

**Option B: External PostgreSQL**
- Use your own PostgreSQL provider (Railway, Supabase, AWS RDS, etc.)
- Get your connection string in the format: `postgresql://user:password@host:port/database`

**Option C: Local PostgreSQL** (Not recommended for production)
- Set up locally for testing only

### Step 2: Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In the Vercel project settings → Environment Variables
   - Add: `DATABASE_URL` = your PostgreSQL connection string from Step 1
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Step 3: Troubleshooting

If you see "This page couldn't load" error:

1. **Check Environment Variables**
   - Ensure `DATABASE_URL` is set in Vercel
   - The variable must be a valid PostgreSQL connection string
   - Example: `postgresql://user:password@host:5432/db`

2. **Check Build Logs**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click the failed deployment → "Build Logs"
   - Look for error messages about missing environment variables

3. **Common Issues**
   - ❌ Missing `DATABASE_URL`: Will cause "DATABASE_URL environment variable is not set"
   - ❌ Invalid connection string format
   - ❌ Database not accessible from Vercel servers
   - ✅ Allow public internet access if using cloud database
   - ✅ Use environment variables from your database provider

## Environment Variables

Required variables for Vercel deployment:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `BETTER_AUTH_URL` | ❌ No | Custom auth URL (auto-detected) | `https://your-domain.com` |

## Database Setup Commands

After deploying, you may need to:

```bash
# Push schema changes (from your local environment)
pnpm db:push

# Generate migrations
pnpm db:generate

# Access database shell
psql $DATABASE_URL
```

## Development

### Project Structure

```
app/
├── (app)/              # Protected routes (require auth)
├── api/                # API routes
├── sign-in/            # Auth pages
├── sign-up/
└── actions/            # Server actions for forms

components/
├── ui/                 # Shadcn UI components
├── diet/               # Diet planner components
├── reports/            # Report analyzer
├── symptoms/           # Symptom checker
└── ...

lib/
├── auth.ts             # Authentication setup
├── db/                 # Database configuration
└── medical/            # Medical data (diseases, symptoms, foods, etc.)
```

### Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Features Documentation

### Symptom Checker
- Users select symptoms from 41 clinical options
- AI model predicts probabilities across 34 diseases
- Results include clinical context and recommendations

### Report Analyzer
- Upload PDF files or images of medical reports
- OCR extracts text from documents
- AI analyzes lab values and flags abnormalities
- Generates human-readable summary

### Diet Planner
- Personalized nutrition plans based on diagnosis
- Recommended and restricted foods
- Daily meal plans with macro breakdowns
- Nutritional guidance

### Health Dashboard
- View analysis history
- Track past diagnoses and reports
- Export results as PDF/images
- Review dietary recommendations

## API Endpoints

- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout
- Server actions in `app/actions/` for form submissions

## Security Notes

- All sensitive data is stored in the database
- Authentication uses secure session cookies
- Database connections are encrypted
- API routes are protected where needed

## Common Errors & Solutions

### "DATABASE_URL environment variable is not set"
**Solution**: Add DATABASE_URL to Vercel environment variables (see Deployment section)

### "Error: connect ECONNREFUSED"
**Solution**: Database is not accessible. Check:
- Connection string is correct
- Database server is running
- Network access is allowed (cloud DB firewall rules)

### "CORS errors"
**Solution**: Check `trustedOrigins` in `lib/auth.ts` - make sure your domain is included

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Support

For issues and questions:
1. Check the [GitHub Issues](https://github.com/parmesh-kumar-ai/MediScanAI/issues)
2. Review the deployment troubleshooting section above
3. Check your Vercel deployment logs
