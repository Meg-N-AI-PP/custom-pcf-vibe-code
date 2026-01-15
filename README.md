# Cascading Selector - Power Apps PCF Component

A professional Power Apps Component Framework (PCF) control that provides a three-level cascading selector with hierarchical data selection.

## Overview

This component demonstrates a cascading three-level selection interface, perfect for hierarchical data like:
- **Category → Subcategory → Item**
- **Country → State → City**
- **Department → Team → Employee**
- **Product Line → Product Type → Specific Product**

The selected values are combined into a single text field (`SelectedValue`) that can be bound to Power Apps data sources.

## Features

✨ **Three-Level Cascading Selection**
- Progressive dropdown menus that enable based on previous selections
- Each level unlocks the next with relevant options

📊 **Smart Value Management**
- Combined output format: "Level1 / Level2 / Level3"
- SelectedValue property for easy Power Apps binding
- Real-time value updates

🎨 **Professional UI**
- Microsoft Fluent-inspired design
- Visual feedback for enabled/disabled states
- Progress indicators and selection badges
- Copy to clipboard functionality

🔄 **Built-in Controls**
- Reset button to clear all selections
- Visual display of current selections
- Helper text for user guidance

## Quick Start

### For Power Apps Users

1. **Deploy the component** (see [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions)
2. **Add to your app:**
   - Canvas App: Insert → Get more components → Code → CascadingSelector
   - Model-Driven: Add to form field as custom control
3. **Use the SelectedValue:**
   ```javascript
   CascadingSelector1.SelectedValue
   // Returns: "Technology / Software / Web Development"
   ```

### For Developers

```bash
# Clone the repository
git clone https://github.com/Meg-N-AI-PP/custom-pcf-vibe-code.git
cd custom-pcf-vibe-code

# Build the PCF component
cd CascadingSelector
npm install
npm run build

# Test locally
npm run start

# Deploy to Power Apps
pac auth create --url https://yourorg.crm.dynamics.com
pac pcf push --publisher-prefix dev
```

## Project Structure

```
custom-pcf-vibe-code/
├── CascadingSelector/              # PCF Component
│   ├── ControlManifest.Input.xml  # Component manifest
│   ├── index.ts                   # Main component logic
│   ├── css/
│   │   └── CascadingSelector.css  # Component styles
│   ├── package.json               # Component dependencies
│   ├── tsconfig.json              # TypeScript config
│   └── README.md                  # Component documentation
├── src/                           # Original React demo app
│   ├── components/
│   │   └── CascadingSelector.tsx  # React version (reference)
│   └── ...
├── DEPLOYMENT.md                  # Deployment guide
└── README.md                      # This file
```

## Component Properties

| Property | Type | Description | Binding |
|----------|------|-------------|---------|
| **SelectedValue** | SingleLine.Text | Combined value from all three selections | Output (bound) |

**Output Format:** `"Level1 / Level2 / Level3"`

## Usage Examples

### Canvas App - Basic Binding

```javascript
// Store selection in variable
Set(varCategory, CascadingSelector1.SelectedValue)

// Display in label
Label1.Text = CascadingSelector1.SelectedValue

// Conditional display
If(
    !IsBlank(CascadingSelector1.SelectedValue),
    "Selected: " & CascadingSelector1.SelectedValue,
    "Please make a selection"
)
```

### Canvas App - Save to Data Source

```javascript
// Patch to SharePoint or Dataverse
Patch(
    Categories,
    Defaults(Categories),
    {
        Title: "New Entry",
        CategoryPath: CascadingSelector1.SelectedValue
    }
)
```

### Model-Driven App

Add as custom control to any text field:
1. Open form designer
2. Select text field
3. Add Control → CascadingSelector
4. Configure for Web/Phone/Tablet
5. Save and Publish

## Sample Data Structure

The component comes with pre-populated hierarchical data:

- **Technology**
  - Software → Web Development, Mobile Apps, Desktop Applications...
  - Hardware → Computers, Networking Equipment, Storage Devices...
  - Cloud Services → Infrastructure (IaaS), Platform (PaaS), Software (SaaS)...

- **Business**
  - Operations → Supply Chain, Logistics, Quality Control...
  - Finance → Accounting, Budgeting, Investments...
  - Human Resources → Recruitment, Training, Benefits...

- **Marketing**
  - Digital → Social Media, Email Campaigns, SEO/SEM...
  - Traditional → Print Advertising, TV/Radio, Direct Mail...
  - Brand → Brand Strategy, Visual Identity, Messaging...

- **Sales**
  - Direct Sales → B2B Sales, B2C Sales, Enterprise...
  - Channel Sales → Resellers, Distributors, Affiliates...
  - Customer Success → Onboarding, Support, Retention...

### Customizing Data

Edit the `hierarchyData` object in `CascadingSelector/index.ts`:

```typescript
const hierarchyData: HierarchyData = {
  "YourCategory": {
    "YourSubCategory": ["Item1", "Item2", "Item3"]
  }
};
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions covering:
- Quick start (3 simple steps)
- Direct push deployment
- Solution package creation
- Local testing
- Troubleshooting
- Environment-specific guidance

## Development

### Prerequisites
- Node.js 14.x or higher
- Power Platform CLI
- TypeScript knowledge
- Power Apps environment

### Build Commands

```bash
cd CascadingSelector

# Install dependencies
npm install

# Build component
npm run build

# Watch mode (auto-rebuild on changes)
npm run start:watch

# Clean build
npm run clean

# Rebuild (clean + build)
npm run rebuild

# Test locally
npm run start
```

### Testing Locally

The test harness provides a sandbox environment:

```bash
npm run start
```

This opens a browser where you can:
- Test all three selection levels
- Verify value formatting
- Test reset functionality
- Debug issues

## Browser Support

- ✅ Microsoft Edge (Chromium)
- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Safari

## Known Limitations

1. **Static Data:** Hierarchy data is currently embedded in the component (future enhancement: dynamic data sources)
2. **Complete Selection Required:** All three levels must be selected before SelectedValue is populated
3. **No Search:** Dropdowns don't have search/filter capability (native HTML select elements)

## Roadmap

Future enhancements planned:
- [ ] Dynamic data source support (CDS/Dataverse)
- [ ] Configurable number of levels (2-5 levels)
- [ ] Search/filter within dropdowns
- [ ] Optional pre-selection from SelectedValue
- [ ] Accessibility improvements (ARIA)
- [ ] Localization support

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Component not appearing?
- Verify PCF components are enabled in your environment
- Check solution import status
- Clear browser cache

### Build errors?
```bash
cd CascadingSelector
npm run clean
rm -rf node_modules
npm install
npm run build
```

### SelectedValue not updating?
- Ensure all three levels are selected
- Check binding syntax
- Verify no formula errors

See [DEPLOYMENT.md](DEPLOYMENT.md) for more troubleshooting tips.

## Resources

- 📘 [PCF Documentation](https://docs.microsoft.com/powerapps/developer/component-framework/)
- 🛠️ [Power Platform CLI](https://docs.microsoft.com/powerapps/developer/data-platform/powerapps-cli)
- 🎓 [PCF Tutorial](https://docs.microsoft.com/powerapps/developer/component-framework/implementing-controls-using-typescript)
- 📦 [Component Packaging](https://docs.microsoft.com/powerapps/developer/component-framework/implementing-controls-using-typescript)

## License

MIT License - Copyright (c) GitHub, Inc.

See [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or feature requests:
- 🐛 [Open an issue](https://github.com/Meg-N-AI-PP/custom-pcf-vibe-code/issues)
- 📖 Check [DEPLOYMENT.md](DEPLOYMENT.md)
- 💬 Review existing issues

---

**Ready to deploy? Check out [DEPLOYMENT.md](DEPLOYMENT.md) to get started!** 🚀
