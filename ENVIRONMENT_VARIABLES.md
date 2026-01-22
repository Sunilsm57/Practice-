# Environment Variables Configuration

## Render Environment Variables Setup

Environment variables allow you to configure your application without changing the code. They're particularly useful for:
- Different environments (development, staging, production)
- Sensitive information (API keys, secrets)
- Configuration management

## For Your Angular Todo Application

### Required Environment Variables

| Variable | Default | Purpose | Example |
|----------|---------|---------|---------|
| `NODE_ENV` | `production` | Node.js environment | `production`, `development` |
| `PORT` | `3000` | Server port | `3000`, `4000` |
| `API_URL` | `https://jsonplaceholder.typicode.com` | Backend API endpoint | `https://api.example.com` |

## Current Render Configuration

Your `render.yaml` includes:

```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: 3000
  - key: API_URL
    value: https://jsonplaceholder.typicode.com
```

## How to Use Environment Variables

### 1. In Node.js Server (server.ts)
Access environment variables using `process.env`:

```typescript
const port = process.env['PORT'] || 4000;
const apiUrl = process.env['API_URL'] || 'https://jsonplaceholder.typicode.com';
const nodeEnv = process.env['NODE_ENV'] || 'development';

console.log(`Starting server on port ${port}`);
console.log(`API URL: ${apiUrl}`);
console.log(`Environment: ${nodeEnv}`);
```

### 2. In Angular Components (TypeScript)
Create an environment service:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getApiUrl(): string {
    return window['APP_CONFIG']?.apiUrl || 'https://jsonplaceholder.typicode.com';
  }
}
```

## Setting Environment Variables on Render

### Via render.yaml (Recommended)
Add variables directly in your `render.yaml`:

```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: 3000
  - key: API_URL
    value: https://api.yourdomain.com
  - key: API_KEY
    value: your-secret-key-here
```

### Via Render Dashboard
1. Go to your Web Service in Render Dashboard
2. Click **Environment** tab
3. Click **Add Environment Variable**
4. Enter **Key** and **Value**
5. Click **Save Changes**
6. Service will automatically redeploy

## Sensitive Information & Secrets

⚠️ **Security Note:** Never commit secrets in your repository!

### Best Practice for Secrets:

1. **Use Render's Secret Files** for sensitive data
2. **Store in `.env.local`** (add to `.gitignore`)
3. **Set via Render Dashboard** for production

### Example for API Keys:

```yaml
envVars:
  - key: API_KEY
    value: $$API_KEY  # Reference secret variable
```

Then set `API_KEY` as a secret in Render Dashboard.

## Environment-Specific Configuration

### Development
```yaml
NODE_ENV: development
API_URL: http://localhost:3000
DEBUG: true
```

### Staging
```yaml
NODE_ENV: staging
API_URL: https://staging-api.example.com
DEBUG: true
```

### Production (Render)
```yaml
NODE_ENV: production
API_URL: https://api.example.com
DEBUG: false
```

## Accessing Environment Variables

### In Node.js
```typescript
// server.ts
const port = process.env['PORT'] || 3000;
const apiUrl = process.env['API_URL'];
const debug = process.env['DEBUG'] === 'true';
```

### In Angular Component
```typescript
// Create environment service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  readonly apiUrl = this.getApiUrl();
  
  private getApiUrl(): string {
    // For SSR, read from server
    if (typeof window === 'undefined') {
      return process.env['API_URL'] || 'https://jsonplaceholder.typicode.com';
    }
    // For browser, use window object
    return (window as any)['APP_CONFIG']?.apiUrl || 'https://jsonplaceholder.typicode.com';
  }
}
```

## Common Environment Variables

```yaml
# Server Configuration
NODE_ENV: production
PORT: 3000

# API Configuration
API_URL: https://api.example.com
API_KEY: your-api-key

# Database
DATABASE_URL: postgresql://user:password@host:port/db

# Logging
LOG_LEVEL: info

# Security
CORS_ORIGIN: https://yourdomain.com
SESSION_SECRET: your-secret-key

# Features
ENABLE_ANALYTICS: true
ENABLE_DEBUG: false
```

## Render-Specific Variables

Render automatically provides these variables:

```bash
RENDER_INSTANCE_ID     # Unique instance ID
RENDER_SERVICE_ID      # Service ID
RENDER_SERVICE_NAME    # Service name
RENDER_DEPLOYMENT_ID   # Deployment ID
RENDER_GIT_REPO_SLUG   # Repository slug
RENDER_GIT_BRANCH      # Branch name
RENDER_GIT_COMMIT      # Commit hash
```

## Updating Environment Variables

1. **Via render.yaml:**
   - Edit the file
   - Commit and push to GitHub
   - Render auto-redeploys

2. **Via Render Dashboard:**
   - Go to **Environment** tab
   - Modify or add variables
   - Click **Save Changes**
   - Service redeploys automatically

## Redeployment

Any change to environment variables will:
- Trigger a new deployment
- Keep your application online during redeploy
- Update configurations without rebuilding (if possible)

## Debugging Environment Variables

Add logging in your server to verify variables are loaded:

```typescript
function run(): void {
  console.log('=== Environment Configuration ===');
  console.log('NODE_ENV:', process.env['NODE_ENV']);
  console.log('PORT:', process.env['PORT']);
  console.log('API_URL:', process.env['API_URL']);
  console.log('==================================');
  
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
```

## For Your Todo Application

Recommended environment variables to set:

```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: 3000
  - key: API_URL
    value: https://jsonplaceholder.typicode.com  # or your API
  - key: APP_NAME
    value: Angular Todo Application
  - key: APP_VERSION
    value: 1.0.0
```

## Related Files

- `render.yaml` - Environment variable declarations
- `server.ts` - Node.js server accessing variables
- `.env.local` - Local development (add to .gitignore)
