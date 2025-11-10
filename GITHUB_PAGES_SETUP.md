# GitHub Pages Setup Guide

This document provides step-by-step instructions to configure GitHub Pages for this repository and troubleshoot any deployment issues.

## Prerequisites

- Repository must be public (GitHub Pages free tier requirement) or you must have GitHub Pro/Team/Enterprise
- You must have admin access to the repository

## Configuration Steps

### 1. Enable GitHub Pages with GitHub Actions

1. Go to your repository on GitHub: `https://github.com/ishanaggarwal/ishanportfolio`
2. Click on **Settings** (gear icon in the top menu)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown
   - ⚠️ **Important**: Do NOT select "Deploy from a branch" - the source MUST be "GitHub Actions"
5. Save the settings (if there's a save button)

### 2. Verify Workflow Permissions

1. In the repository **Settings**, go to **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Ensure either:
   - "Read and write permissions" is selected, OR
   - "Read repository contents and packages permissions" is selected with "Allow GitHub Actions to create and approve pull requests" checked
4. Click **Save** if you made any changes

### 3. Trigger the Deployment

The deployment workflow (`.github/workflows/deploy.yml`) is configured to run automatically when:
- Code is pushed to the `main` branch
- Manually triggered via workflow_dispatch

**To manually trigger the workflow:**
1. Go to **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow in the left sidebar
3. Click the **Run workflow** button (on the right)
4. Select the `main` branch
5. Click **Run workflow**

**To trigger via push:**
1. Merge this PR to the `main` branch
2. The workflow will automatically run

### 4. Monitor the Deployment

1. Go to the **Actions** tab
2. Click on the latest workflow run
3. Monitor the progress of both the `build` and `deploy` jobs
4. If successful, you should see a green checkmark
5. The deployment URL will be shown in the deploy job output

### 5. Access Your Site

Once deployed, your site will be available at:
```
https://ishanaggarwal.github.io/ishanportfolio/
```

⚠️ **Note**: The site is configured with a base path of `/ishanportfolio/` because it's a project site (not a user/org site). All assets and links are configured to use this base path.

## Troubleshooting

### 404 Error After Deployment

**Symptoms:** Site shows "404 - File not found" error

**Possible Causes and Solutions:**

1. **GitHub Pages source is not set to "GitHub Actions"**
   - Solution: Follow Step 1 above to set the source correctly

2. **Workflow hasn't completed successfully**
   - Solution: Check the Actions tab for any failed runs and review the logs
   - Common issues: npm install failures, build errors

3. **Accessing wrong URL**
   - ❌ Wrong: `https://ishanaggarwal.github.io/`
   - ✅ Correct: `https://ishanaggarwal.github.io/ishanportfolio/`

4. **Repository is private** (for free accounts)
   - Solution: Make the repository public in Settings → General → Danger Zone

### Assets Not Loading (CSS/JS files return 404)

**Symptoms:** Site loads but looks broken, DevTools show 404 errors for CSS/JS files

**Solution:** This indicates the base path configuration is incorrect. Verify:
1. `next.config.mjs` has the correct `basePath` and `assetPrefix`
2. The build was done with `NODE_ENV=production`

### Workflow Fails to Deploy

**Check these common issues:**

1. **Permissions Error**
   - Error: "Resource not accessible by integration"
   - Solution: Check workflow permissions (see Step 2 above)

2. **Build Fails**
   - Check the build logs in the Actions tab
   - Common causes: missing dependencies, TypeScript errors, lint errors

3. **Artifact Upload Fails**
   - Ensure the `out` directory is created during build
   - Check that `output: "export"` is set in `next.config.mjs`

## Verification Checklist

Use this checklist to verify everything is set up correctly:

- [ ] Repository Settings → Pages → Source is set to "GitHub Actions"
- [ ] Workflow permissions are correctly configured
- [ ] Latest workflow run shows green checkmarks for both build and deploy jobs
- [ ] Site is accessible at `https://ishanaggarwal.github.io/ishanportfolio/`
- [ ] CSS and JavaScript assets load correctly (check browser DevTools)
- [ ] No console errors in browser DevTools
- [ ] All pages and links work correctly

## Technical Details

### Project Configuration

This is a Next.js 15 application with the following configuration for static export:

**next.config.mjs:**
```javascript
{
  output: "export",  // Enables static HTML export
  basePath: "/ishanportfolio",  // Project base path
  assetPrefix: "/ishanportfolio/",  // Asset URL prefix
  images: {
    unoptimized: true  // Required for static export
  }
}
```

**Key Files:**
- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment
- `public/.nojekyll` - Prevents GitHub from ignoring `_next` directory
- Build output is generated in the `out/` directory (gitignored)

### Workflow Overview

The deployment workflow consists of two jobs:

1. **Build Job:**
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds the project with `npm run build`
   - Uploads the `out/` directory as an artifact

2. **Deploy Job:**
   - Downloads the artifact
   - Deploys to GitHub Pages

## Support

If you continue to experience issues:

1. Check the [GitHub Actions logs](https://github.com/ishanaggarwal/ishanportfolio/actions) for detailed error messages
2. Verify all configuration files match the settings described in this document
3. Ensure your GitHub account has the necessary permissions
4. For GitHub Pages-specific issues, see [GitHub Pages documentation](https://docs.github.com/en/pages)

---

Last Updated: November 2025
