# Deployment Guide - Cascading Selector PCF Component

This guide provides step-by-step instructions for deploying the Cascading Selector PCF component to Power Apps.

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v14.x or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **Power Platform CLI**
   ```bash
   npm install -g @microsoft/power-platform-cli
   ```
   - Verify installation: `pac --version`

3. **Power Apps Environment**
   - Administrator or System Customizer role
   - PCF components must be enabled in your environment
   - Access to make.powerapps.com

4. **.NET SDK** (for solution packaging)
   - Download .NET 6.0 or later: https://dotnet.microsoft.com/download

## Quick Start - 3 Simple Steps

### Step 1: Build the Component

```bash
# Navigate to the PCF component directory
cd CascadingSelector

# Install dependencies (first time only)
npm install

# Build the component
npm run build
```

Expected output:
```
[build] Succeeded
```

### Step 2: Authenticate with Power Platform

```bash
# Replace with your environment URL
pac auth create --url https://yourorg.crm.dynamics.com
```

You'll be prompted to sign in with your Microsoft account. Use the account that has admin access to your Power Apps environment.

### Step 3: Push to Power Apps

```bash
# From the CascadingSelector directory
pac pcf push --publisher-prefix dev
```

The component will be automatically deployed to your environment!

## Detailed Deployment Methods

### Method 1: Direct Push (Recommended for Testing)

This method is fastest and ideal for development/testing:

```bash
# Navigate to component directory
cd CascadingSelector

# Authenticate
pac auth create --url https://yourorg.crm.dynamics.com

# Push component
pac pcf push --publisher-prefix dev

# Optional: Use your own publisher prefix
pac pcf push --publisher-prefix yourprefix
```

**Pros:**
- Fastest method
- Automatic registration
- Great for rapid iteration

**Cons:**
- Not suitable for production
- Creates unmanaged customization

### Method 2: Solution Package (Recommended for Production)

This method creates a proper solution package:

#### 2.1 Create Solution Structure

From the repository root:

```bash
# Create a new solution
pac solution init --publisher-name "YourCompany" --publisher-prefix dev

# Add the PCF component reference
pac solution add-reference --path ./CascadingSelector
```

This creates:
- `cdsproj` file
- Solution XML files
- Proper solution structure

#### 2.2 Build the Solution

```bash
# Restore and build
dotnet build
```

Or using MSBuild:

```bash
msbuild /t:build /restore
```

This generates a `.zip` file in `bin/Debug/` or `bin/Release/`

#### 2.3 Import to Power Apps

**Option A: Using PAC CLI**
```bash
pac solution import --path bin/Debug/YourSolution.zip
```

**Option B: Using Power Apps Portal**
1. Go to https://make.powerapps.com
2. Select your environment
3. Click **Solutions** in left navigation
4. Click **Import solution**
5. Browse and select the `.zip` file
6. Click **Next** and follow the wizard
7. Click **Import**

**Pros:**
- Production-ready
- Version control
- Can create managed solutions
- ALM (Application Lifecycle Management) friendly

**Cons:**
- More setup required
- Takes longer than direct push

### Method 3: Test Harness (Local Testing)

Test the component locally before deploying:

```bash
# From CascadingSelector directory
npm run start
```

This opens a browser with a local test environment where you can:
- Interact with the component
- Test functionality
- Debug issues
- No deployment needed

## Using the Component in Power Apps

Once deployed, follow these steps to add it to your app:

### For Canvas Apps:

1. **Open your Canvas App** in edit mode
2. Click **Insert** → **Get more components**
3. Select **Code** tab
4. Find "CascadingSelector" in the list
5. Click **Import**
6. Now you can insert it from **Insert** → **Custom** → **CascadingSelector**

### Bind the SelectedValue Property:

```javascript
// Store the value in a variable
Set(mySelectedValue, CascadingSelector1.SelectedValue)

// Use in a label
Label1.Text = CascadingSelector1.SelectedValue

// Submit to data source
Patch(
    YourDataSource,
    Defaults(YourDataSource),
    {
        CategoryField: CascadingSelector1.SelectedValue
    }
)
```

### For Model-Driven Apps:

1. **Open your form** in the form designer
2. Select the text field where you want the control
3. Click **Change properties**
4. Under **Controls** tab, click **Add Control**
5. Select **CascadingSelector**
6. Configure display options (Web, Phone, Tablet)
7. Click **Save** and **Publish**

## Verification

After deployment, verify the component is working:

1. **Check Solution:**
   - Go to Solutions in Power Apps
   - Open your solution
   - Verify "CascadingSelector" appears under Custom Controls

2. **Test in Canvas App:**
   - Create a new Canvas App
   - Try importing the component
   - Add it to the canvas
   - Test the three-level selection
   - Verify SelectedValue updates

3. **Test Value Binding:**
   ```javascript
   // Add a label with formula:
   CascadingSelector1.SelectedValue
   
   // Select all three levels
   // Label should show: "Technology / Software / Web Development"
   ```

## Troubleshooting

### Problem: Component doesn't appear in Power Apps

**Solutions:**
1. Verify PCF components are enabled:
   - Admin Center → Environments → Select environment
   - Settings → Features → Enable PCF component framework
2. Check solution import status:
   - Solutions → Click on your solution → Check for errors
3. Clear browser cache and try again
4. Re-authenticate: `pac auth clear` then `pac auth create`

### Problem: Build fails

**Solutions:**
```bash
# Clean and rebuild
cd CascadingSelector
npm run clean
rm -rf node_modules
npm install
npm run build
```

### Problem: "Cannot find namespace ComponentFramework"

**Solution:**
```bash
# Regenerate types
npm run refreshTypes
```

### Problem: Authentication fails

**Solutions:**
1. Ensure your account has proper permissions
2. Try clearing auth: `pac auth clear`
3. Use device code flow: `pac auth create --deviceCode`
4. Check environment URL is correct (must include https://)

### Problem: SelectedValue not updating

**Check:**
1. All three levels must be selected for output
2. Verify binding syntax is correct
3. Check formula bar for errors
4. Refresh the data source

## Environment-Specific Notes

### Development Environment
- Use `pac pcf push` for quick iterations
- Use publisher prefix: `dev`
- Unmanaged solution is fine

### Test/QA Environment
- Import via solution package
- Use descriptive publisher prefix
- Consider managed solution

### Production Environment
- **Always use managed solutions**
- Use company publisher prefix
- Test thoroughly in lower environments first
- Document version numbers
- Have rollback plan

## Version Management

When updating the component:

1. **Update version in ControlManifest.Input.xml:**
```xml
<control ... version="1.0.1" ...>
```

2. **Update package.json version:**
```json
"version": "1.0.1"
```

3. **Rebuild and redeploy:**
```bash
npm run build
pac pcf push --publisher-prefix dev
```

4. **For solutions, increment solution version**

## Best Practices

1. **Always test locally first** using `npm run start`
2. **Use version control** for the component code
3. **Document customizations** to the hierarchy data
4. **Use publisher prefix** that matches your organization
5. **Create backups** before importing solutions
6. **Test in non-production** environments first
7. **Keep dependencies updated** for security

## Additional Resources

- [PCF Documentation](https://docs.microsoft.com/powerapps/developer/component-framework/)
- [Power Platform CLI](https://docs.microsoft.com/powerapps/developer/data-platform/powerapps-cli)
- [Solution Concepts](https://docs.microsoft.com/power-platform/alm/solution-concepts-alm)
- [Component Packaging](https://docs.microsoft.com/powerapps/developer/component-framework/implementing-controls-using-typescript)

## Getting Help

If you encounter issues:

1. Check this deployment guide
2. Review the CascadingSelector/README.md
3. Check build logs: `CascadingSelector/out/` directory
4. Enable verbose logging: `pac pcf push --publisher-prefix dev --verbose`
5. Post issue on repository with:
   - Error message
   - Build logs
   - Environment details
   - Steps to reproduce

---

## Quick Reference Commands

```bash
# Install dependencies
cd CascadingSelector && npm install

# Build component
npm run build

# Test locally
npm run start

# Authenticate
pac auth create --url https://yourorg.crm.dynamics.com

# Deploy
pac pcf push --publisher-prefix dev

# Create solution
pac solution init --publisher-name "YourCompany" --publisher-prefix dev
pac solution add-reference --path ./CascadingSelector

# Build solution
dotnet build

# Import solution
pac solution import --path bin/Debug/YourSolution.zip

# Clean build
npm run clean && npm install && npm run build
```

---

**You're now ready to deploy your Cascading Selector component to Power Apps!** 🚀
