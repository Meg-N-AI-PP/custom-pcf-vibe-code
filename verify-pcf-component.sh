#!/bin/bash

echo "🔍 Verifying PCF Component..."
echo ""

# Check directory structure
echo "✅ Checking directory structure..."
if [ -d "CascadingSelector" ]; then
    echo "   ✓ CascadingSelector directory exists"
else
    echo "   ✗ CascadingSelector directory missing"
    exit 1
fi

# Check required files
echo ""
echo "✅ Checking required files..."
files=(
    "CascadingSelector/ControlManifest.Input.xml"
    "CascadingSelector/index.ts"
    "CascadingSelector/package.json"
    "CascadingSelector/tsconfig.json"
    "CascadingSelector/css/CascadingSelector.css"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file missing"
        exit 1
    fi
done

# Check SelectedValue property in manifest
echo ""
echo "✅ Checking SelectedValue property..."
if grep -q 'name="SelectedValue"' CascadingSelector/ControlManifest.Input.xml; then
    echo "   ✓ SelectedValue property defined in manifest"
    if grep -q 'of-type="SingleLine.Text"' CascadingSelector/ControlManifest.Input.xml; then
        echo "   ✓ Property type is SingleLine.Text"
    fi
    if grep -q 'usage="bound"' CascadingSelector/ControlManifest.Input.xml; then
        echo "   ✓ Property usage is bound"
    fi
else
    echo "   ✗ SelectedValue property not found"
    exit 1
fi

# Check if dependencies are installed
echo ""
echo "✅ Checking dependencies..."
if [ -d "CascadingSelector/node_modules" ]; then
    echo "   ✓ Dependencies installed"
else
    echo "   ⚠ Dependencies not installed (run: cd CascadingSelector && npm install)"
fi

# Check build output
echo ""
echo "✅ Checking build output..."
if [ -d "CascadingSelector/out/controls" ]; then
    echo "   ✓ Build output exists"
    if [ -f "CascadingSelector/out/controls/bundle.js" ]; then
        echo "   ✓ bundle.js generated"
    fi
    if [ -f "CascadingSelector/out/controls/ControlManifest.xml" ]; then
        echo "   ✓ ControlManifest.xml generated"
    fi
else
    echo "   ⚠ Build output not found (run: cd CascadingSelector && npm run build)"
fi

# Check documentation
echo ""
echo "✅ Checking documentation..."
docs=(
    "README.md"
    "DEPLOYMENT.md"
    "PCF_CONVERSION_SUMMARY.md"
    "CascadingSelector/README.md"
    "CascadingSelector/QUICKSTART.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✓ $doc"
    else
        echo "   ✗ $doc missing"
    fi
done

echo ""
echo "🎉 Verification complete!"
echo ""
echo "📋 Next steps:"
echo "   1. cd CascadingSelector && npm install (if not done)"
echo "   2. npm run build (if not done)"
echo "   3. npm run start (to test locally)"
echo "   4. Follow DEPLOYMENT.md to deploy to Power Apps"
echo ""
