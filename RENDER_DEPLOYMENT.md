# Render Deployment Configuration
## Root Directory: ./

This project is configured to deploy on Render with the following setup:

### Configuration Details

- **Service Type:** Web Service
- **Environment:** Node.js
- **Root Directory:** ./ (project root)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run serve:ssr:project`
- **Node Version:** 18.x or higher recommended

### Deployment Steps

1. Push your code to GitHub (already done ✓)
2. Create a new Web Service on Render.com
3. Connect your GitHub repository
4. Select the branch (master)
5. Configure the following:
   - **Name:** angular-todo-app (or your preferred name)
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run serve:ssr:project`
   - **Node Version:** 18 (or latest LTS)

### Environment Variables (if needed)

The application is configured with:
- NODE_ENV = production

### Features Deployed

✅ Angular 17 SSR (Server-Side Rendering)
✅ Material Design Components
✅ RESTful API Integration
✅ Lazy Loading Modules
✅ Responsive UI

### Build Output

The build process generates:
- Production build in `/dist/project/browser/`
- Server bundle in `/dist/project/server/`
- Static assets optimized for deployment

### Troubleshooting

If deployment fails:
1. Check Node.js version compatibility
2. Ensure all dependencies are installed
3. Verify the build command completes without errors
4. Check Render logs for specific error messages

### Contact & Support

For more information on Render deployment:
- [Render Docs](https://render.com/docs)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
