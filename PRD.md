# Planning Guide

A cascading three-level selector component that progressively reveals options and combines selections into a single formatted value, demonstrating the Power Apps PCF control pattern in a web environment.

**Experience Qualities**:
1. **Intuitive** - Each selection naturally flows to the next, with clear visual progression through the three levels
2. **Precise** - Users maintain full control over their cascading selections with the ability to modify any level and see immediate updates
3. **Professional** - Clean, form-focused interface that feels like an enterprise application tool

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused form control demonstration with cascading state management, real-time value composition, and clear visual feedback - more than a single-purpose tool but not requiring multiple views or complex workflows.

## Essential Features

### Cascading Three-Level Select
- **Functionality**: Three connected select dropdowns where each selection enables and populates the next level
- **Purpose**: Demonstrate hierarchical data selection common in enterprise forms (e.g., Country > State > City, or Category > Subcategory > Item)
- **Trigger**: User opens the first select dropdown
- **Progression**: Select Level 1 → Level 2 becomes enabled and populated → Select Level 2 → Level 3 becomes enabled and populated → Select Level 3 → Combined value displayed
- **Success criteria**: All three levels can be selected, subsequent levels reset when parent changes, and final combined value updates in real-time

### Combined Value Display
- **Functionality**: Shows the formatted combination of all three selections in a read-only text field
- **Purpose**: Demonstrate the final output that would be stored in the Power Apps field
- **Trigger**: Any level selection is made or changed
- **Progression**: Selection made → Value immediately updates with formatted combination → User sees result in real-time
- **Success criteria**: Combined value updates instantly, shows clear formatting (e.g., "Level1 / Level2 / Level3"), and handles partial selections gracefully

### Reset Functionality
- **Functionality**: Clear all selections and return to initial state
- **Purpose**: Allow users to start over without page refresh
- **Trigger**: User clicks reset button
- **Progression**: Click reset → All selections cleared → Levels 2 and 3 disabled → Combined value cleared → Ready for new selection
- **Success criteria**: Single action clears all state and returns component to pristine state

### Sample Data Management
- **Functionality**: Pre-populated hierarchical data that demonstrates realistic category relationships
- **Purpose**: Provide working example data that shows the component's capabilities
- **Trigger**: Component loads with seed data
- **Progression**: App loads → Sample hierarchy available → User can immediately interact with realistic options
- **Success criteria**: Data structure supports parent-child relationships, contains 3-5 options per level, and uses relatable example domain

## Edge Case Handling

- **Partial Selection**: Display helpful placeholder text when only 1 or 2 levels selected (e.g., "Select all three levels to generate value")
- **Parent Change Reset**: When changing a parent level, gracefully clear child selections and show visual feedback
- **Empty States**: Handle cases where a selected parent has no children with clear messaging
- **Long Text Values**: Ensure combined values display properly even with lengthy option names using text truncation and tooltips

## Design Direction

The design should evoke precision, clarity, and professional utility - feeling like a well-crafted form control in an enterprise application. Think Microsoft Fluent UI meets modern SaaS dashboards: clean lines, subtle depth, and purposeful interactions that guide users through the cascading flow.

## Color Selection

A professional blue-based palette with neutral foundations that feels trustworthy and form-focused.

- **Primary Color**: Deep professional blue (oklch(0.45 0.15 250)) - Communicates reliability and corporate professionalism, used for interactive elements
- **Secondary Colors**: Soft slate background (oklch(0.96 0.005 250)) for cards, medium gray (oklch(0.65 0.01 250)) for secondary actions
- **Accent Color**: Vibrant cyan-blue (oklch(0.60 0.18 230)) - Highlights active selections and focus states with energy
- **Foreground/Background Pairings**: 
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.99 0 0)) - Ratio 8.2:1 ✓
  - Accent (Cyan-Blue oklch(0.60 0.18 230)): White text (oklch(0.99 0 0)) - Ratio 5.1:1 ✓
  - Background (White oklch(1 0 0)): Dark gray text (oklch(0.25 0.01 250)) - Ratio 13.5:1 ✓
  - Muted (Slate oklch(0.96 0.005 250)): Medium gray text (oklch(0.45 0.01 250)) - Ratio 6.8:1 ✓

## Font Selection

Typography should be technical yet approachable, with clear hierarchy that guides users through the multi-step selection process.

- **Primary Font**: Inter - Clean, highly legible sans-serif that works excellently for form interfaces
- **Typographic Hierarchy**:
  - H1 (Page Title): Inter SemiBold/32px/tight letter-spacing/-0.02em
  - H2 (Section Label): Inter Medium/16px/normal letter-spacing/0
  - Label Text: Inter Medium/14px/tight line-height/1.3
  - Input Text: Inter Regular/15px/normal line-height/1.5
  - Helper Text: Inter Regular/13px/relaxed line-height/1.6/muted color
  - Combined Value: Inter Medium/16px/mono-like letter-spacing/0.01em (for output clarity)

## Animations

Animations should emphasize the cascading flow and provide subtle feedback for state changes - use motion to guide attention through the three-level progression.

- **Select Transitions**: Smooth 200ms ease for enabling/disabling subsequent levels with subtle opacity fade
- **Value Updates**: Gentle 150ms ease on the combined value display to draw attention without distraction
- **Dropdown Opening**: Quick 180ms spring animation for select menus opening with slight scale (0.98 to 1)
- **Reset Action**: 250ms ease-out that fades and collapses all selections with staggered timing (level 3 → 2 → 1)
- **Focus States**: Immediate border color transition with 120ms ease for input focus rings
- **Hover Interactions**: Subtle 100ms color transitions on buttons and select elements

## Component Selection

- **Components**: 
  - `Select` (Shadcn) - All three cascading dropdowns with custom styling to show enabled/disabled states
  - `Input` (Shadcn) - Read-only text field for displaying the combined value
  - `Label` (Shadcn) - Clear form labels for each selection level
  - `Button` (Shadcn) - Reset button with destructive variant styling
  - `Card` (Shadcn) - Container for the selector interface with subtle elevation
  - `Separator` (Shadcn) - Visual break between selection area and output area
  - `Badge` (Shadcn) - Display individual selections as pills/tags

- **Customizations**: 
  - Custom disabled state styling for Select components with reduced opacity and cursor indication
  - Enhanced focus rings with accent color to guide progression through levels
  - Animated arrow icons between select levels to reinforce cascading flow
  - Custom combined value display with copy-to-clipboard functionality

- **States**:
  - Select elements: default, hover (subtle background), focused (accent border), disabled (gray with reduced opacity), filled (slightly bolder text)
  - Reset button: default, hover (darker shade), active (pressed), disabled (when no selections made)
  - Combined value input: always read-only with distinct styling to show it's output

- **Icon Selection**:
  - `CaretDown` for select dropdown indicators
  - `ArrowRight` between selection levels to show flow
  - `X` for reset/clear action
  - `Copy` for copy-to-clipboard on combined value
  - `Check` for confirming successful copy action

- **Spacing**:
  - Card padding: `p-8` for generous breathing room
  - Form element gaps: `gap-6` between each select level
  - Label-to-input: `gap-2` for tight association
  - Section separation: `gap-8` between selector and output areas
  - Button padding: `px-4 py-2` for comfortable touch targets

- **Mobile**:
  - Stack select elements vertically on all screen sizes for clarity
  - Reduce card padding to `p-6` on mobile
  - Larger touch targets (min 44px height) for all interactive elements
  - Combined value display switches to full-width with text wrapping
  - Reset button spans full width on mobile for easy access
