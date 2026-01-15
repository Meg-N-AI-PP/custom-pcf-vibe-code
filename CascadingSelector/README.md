# Cascading Selector - Power Apps PCF Component

A Power Apps Component Framework (PCF) control that provides a cascading three-level selector with a SelectedValue output field.

## Features

- Three-level cascading dropdown selection (Level 1 → Level 2 → Level 3)
- Automatically enables/disables subsequent levels based on selection
- Combined value output in format: "Level1 / Level2 / Level3"
- SelectedValue property for binding to Power Apps fields
- Copy to clipboard functionality
- Reset functionality to clear all selections
- Visual feedback showing current selections
- Professional UI matching Microsoft Fluent design

## Prerequisites

To build and deploy this component, you need:

1. **Node.js** (version 14.x or higher)
2. **Power Platform CLI** (`pac`)
   - Install: `npm install -g @microsoft/power-platform-cli`
3. **Power Apps environment** with PCF components enabled

## Installation

### Step 1: Install Dependencies

```bash
cd CascadingSelector
npm install
```

### Step 2: Build the Component

```bash
npm run build
```

This will compile the TypeScript code and generate the PCF control output in the `out` directory.

## Deployment to Power Apps

### Option 1: Using Power Platform CLI

1. **Authenticate with your environment**:
```bash
pac auth create --url https://yourorg.crm.dynamics.com
```

2. **Push the component to your environment**:
```bash
pac pcf push --publisher-prefix dev
```

### Option 2: Using Solution File

1. **Create a solution**:
```bash
# From the repository root
pac solution init --publisher-name YourPublisher --publisher-prefix dev
```

2. **Add the component to the solution**:
```bash
pac solution add-reference --path ./CascadingSelector
```

3. **Build the solution**:
```bash
msbuild /t:build /restore
```

4. **Import the solution**:
   - Open Power Apps (make.powerapps.com)
   - Go to Solutions
   - Click "Import solution"
   - Upload the generated `.zip` file from the `bin/Debug` folder

### Option 3: Manual Import (Test Harness)

1. **Start the test harness**:
```bash
npm run start
```

2. This opens a local test environment where you can test the component before deployment

## Using the Component in Power Apps

Once deployed:

1. **Add to a Canvas App**:
   - Open your Canvas App in edit mode
   - Go to Insert → Custom → Import components
   - Select your component
   - Drag it onto your canvas

2. **Configure the SelectedValue property**:
   - Select the component
   - In the properties panel, bind the `SelectedValue` property to a field or variable
   - Example: `Set(myVariable, CascadingSelector.SelectedValue)`

3. **Access the selected value**:
   ```
   // Get the combined value
   CascadingSelector1.SelectedValue
   
   // Use in a label or other control
   Label1.Text = CascadingSelector1.SelectedValue
   ```

## Component Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| SelectedValue | SingleLine.Text | The combined value from all three levels in format "L1 / L2 / L3" | Yes |

## Development

### Watch Mode

For active development with auto-rebuild:

```bash
npm run start:watch
```

### Rebuild

To clean and rebuild:

```bash
npm run rebuild
```

### Refresh Types

After modifying the ControlManifest.Input.xml:

```bash
npm run refreshTypes
```

## File Structure

```
CascadingSelector/
├── ControlManifest.Input.xml  # Component manifest defining properties
├── index.ts                   # Main PCF control implementation
├── css/
│   └── CascadingSelector.css # Component styles
├── generated/                 # Auto-generated type definitions
├── package.json              # Node.js dependencies
└── tsconfig.json             # TypeScript configuration
```

## Customization

### Modifying the Hierarchy Data

Edit the `hierarchyData` object in `index.ts` to change the available options:

```typescript
const hierarchyData: HierarchyData = {
  "YourCategory": {
    "YourSubCategory": ["Item1", "Item2", "Item3"]
  }
};
```

### Styling

Modify `css/CascadingSelector.css` to customize the appearance. The component uses standard CSS classes that can be overridden.

## Browser Support

- Microsoft Edge (Chromium)
- Google Chrome
- Mozilla Firefox
- Safari

## Known Limitations

- The component requires all three levels to be selected before outputting a value
- Hierarchy data is static and embedded in the component (future versions could support dynamic data sources)

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `out` folders
2. Run `npm install` again
3. Run `npm run rebuild`

### Type Generation Issues

If TypeScript types are out of sync:
```bash
npm run refreshTypes
```

### Component Not Appearing in Power Apps

1. Ensure PCF components are enabled in your environment
2. Verify the solution was imported successfully
3. Check that the publisher prefix matches

## Support

For issues or questions, please refer to:
- [Power Apps Component Framework documentation](https://docs.microsoft.com/powerapps/developer/component-framework/)
- Repository issues page

## License

MIT License - See LICENSE file for details
