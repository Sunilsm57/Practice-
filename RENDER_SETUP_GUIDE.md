# Render Deployment Guide

## Quick Start

To deploy your Angular Todo Application on Render:

### Step 1: Create a Render Account
Visit [render.com](https://render.com) and sign up for a free account.

### Step 2: Connect GitHub
1. Go to Dashboard
2. Click "New +" and select "Web Service"
3. Select "Build and deploy from a Git repository"
4. Authorize Render to access your GitHub account
5. Select the repository: `Sunilsm57/Practice-`

### Step 3: Configure Service
Fill in the following settings:
- **Name:** `angular-todo-app`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run serve:ssr:project`
- **Node Version:** `18.16.0` (or latest LTS)

### Step 4: Set Environment Variables (Optional)
Click "Add Environment Variable" and add:
- **Key:** `NODE_ENV`
- **Value:** `production`

### Step 5: Deploy
Click "Create Web Service" and Render will automatically:
1. Clone your repository
2. Install dependencies
3. Build your Angular application
4. Deploy and serve on a public URL

## Expected Build Output

```
Deployment successful!
Your app is running at: https://angular-todo-app.onrender.com
```

## Root Directory Setting

The `rootDir: ./` in render.yaml tells Render to:
- Use the project root as the deployment root
- Run all commands from the project root directory
- Trigger deployments only when files in the root directory change

This is ideal for single-project deployments. For monorepos, update the root directory path to your specific module.

## Performance Tips

1. **Minimize Bundle Size:** The build process optimizes and minifies your code
2. **Caching:** Enable browser caching for static assets
3. **CDN:** Render automatically serves static files through their CDN
4. **Monitoring:** Check Render dashboard for performance metrics

## Health Check

Render automatically checks if your application is running by:
- Making HTTP requests to your service
- If health check fails, Render will attempt to restart the service

Ensure your application responds to requests on the root path `/`.

## Logs and Debugging

Monitor your deployment:
1. Go to your Web Service dashboard
2. Click on "Logs" tab to view:
   - Build logs
   - Runtime logs
   - Errors and warnings

## Database/API Integration

If you need to add a database:
1. Render supports PostgreSQL, MySQL, Redis, etc.
2. Create a new database service
3. Update your environment variables with connection strings
4. Redeploy your application

## Continuous Deployment

With the GitHub integration:
- Every push to `master` branch triggers a new deployment
- Automatic rollback available if deployment fails
- Zero-downtime deployments

## Cost

- Render provides free tier for web services (with limitations)
- For production use, consider Render's paid plans
- Check Render pricing for your specific needs

## Support

For issues:
1. Check Render Logs
2. Review Angular build errors
3. Verify all dependencies are in package.json
4. Contact Render support at support@render.com
