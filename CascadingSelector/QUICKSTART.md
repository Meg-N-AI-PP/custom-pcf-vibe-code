# Quick Start Guide - Cascading Selector PCF Component

Get your PCF component up and running in Power Apps in just a few minutes!

## ⚡ 5-Minute Setup

### Step 1: Build the Component (2 minutes)

```bash
# Navigate to the component folder
cd CascadingSelector

# Install dependencies
npm install

# Build the component
npm run build
```

✅ You should see: `[build] Succeeded`

### Step 2: Deploy to Power Apps (2 minutes)

```bash
# Authenticate with your environment
pac auth create --url https://yourorg.crm.dynamics.com

# Deploy the component
pac pcf push --publisher-prefix dev
```

✅ You should see: Component successfully pushed

### Step 3: Add to Your App (1 minute)

**Canvas App:**
1. Open your app in edit mode
2. Click **Insert** → **Get more components**
3. Select **Code** tab
4. Find **CascadingSelector**
5. Click **Import**
6. Drag from **Insert** → **Custom** onto canvas

**Model-Driven App:**
1. Open form designer
2. Select a text field
3. Click **Change properties** → **Controls** tab
4. Click **Add Control**
5. Select **CascadingSelector**
6. Save and Publish

## 🎯 Use the Component

### Get the Selected Value

```javascript
// In any Power Apps formula
CascadingSelector1.SelectedValue
```

### Example: Display in Label

```javascript
Label1.Text = CascadingSelector1.SelectedValue
```

### Example: Save to Data

```javascript
Patch(
    MyDataSource,
    Defaults(MyDataSource),
    {
        CategoryField: CascadingSelector1.SelectedValue
    }
)
```

## 🧪 Test Locally First

Before deploying, test the component:

```bash
cd CascadingSelector
npm run start
```

This opens a test harness in your browser where you can interact with the component.

## ✅ What You Get

- ✨ Three-level cascading dropdowns
- 📊 Combined value output: "Level1 / Level2 / Level3"
- 🎨 Professional Microsoft Fluent UI styling
- 🔄 Reset button and copy to clipboard
- 📱 Responsive design

## 🆘 Having Issues?

### Build fails?
```bash
npm run clean
rm -rf node_modules
npm install
npm run build
```

### Can't authenticate?
- Check your environment URL (must include https://)
- Ensure you have admin rights
- Try: `pac auth clear` then authenticate again

### Component not appearing?
- Verify PCF components are enabled in your environment
- Admin Center → Environments → Features → Enable PCF
- Clear browser cache

## 📖 Need More Help?

- Full deployment guide: [DEPLOYMENT.md](../DEPLOYMENT.md)
- Component documentation: [README.md](./README.md)
- Repository: [GitHub Issues](https://github.com/Meg-N-AI-PP/custom-pcf-vibe-code/issues)

## 🎓 Learn More

- [Power Platform CLI Docs](https://docs.microsoft.com/powerapps/developer/data-platform/powerapps-cli)
- [PCF Framework Docs](https://docs.microsoft.com/powerapps/developer/component-framework/)

---

**That's it! You're ready to use the Cascading Selector in your Power Apps!** 🚀
