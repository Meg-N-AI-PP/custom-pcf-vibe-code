import * as React from 'react';
import {
  Stack,
  Label,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  Separator,
  Text,
  MessageBar,
  MessageBarType,
  IconButton,
  mergeStyles,
  IStackTokens,
} from '@fluentui/react';

interface HierarchyData {
  [key: string]: {
    [key: string]: string[];
  };
}

const hierarchyData: HierarchyData = {
  "Technology": {
    "Software": ["Web Development", "Mobile Apps", "Desktop Applications", "DevOps Tools", "Database Systems"],
    "Hardware": ["Computers", "Networking Equipment", "Storage Devices", "Peripherals", "Servers"],
    "Cloud Services": ["Infrastructure (IaaS)", "Platform (PaaS)", "Software (SaaS)", "Serverless", "Container Services"]
  },
  "Business": {
    "Operations": ["Supply Chain", "Logistics", "Quality Control", "Process Management", "Facilities"],
    "Finance": ["Accounting", "Budgeting", "Investments", "Risk Management", "Auditing"],
    "Human Resources": ["Recruitment", "Training", "Benefits", "Performance", "Compensation"]
  },
  "Marketing": {
    "Digital": ["Social Media", "Email Campaigns", "SEO/SEM", "Content Marketing", "Analytics"],
    "Traditional": ["Print Advertising", "TV/Radio", "Direct Mail", "Events", "Outdoor"],
    "Brand": ["Brand Strategy", "Visual Identity", "Messaging", "Public Relations", "Partnerships"]
  },
  "Sales": {
    "Direct Sales": ["B2B Sales", "B2C Sales", "Enterprise", "Inside Sales", "Field Sales"],
    "Channel Sales": ["Resellers", "Distributors", "Affiliates", "Partnerships", "OEM"],
    "Customer Success": ["Onboarding", "Support", "Retention", "Upselling", "Renewals"]
  }
};

export interface ICascadingSelectorProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const CascadingSelectorComponent: React.FC<ICascadingSelectorProps> = ({
  selectedValue,
  onValueChange,
}) => {
  const [level1, setLevel1] = React.useState<string>("");
  const [level2, setLevel2] = React.useState<string>("");
  const [level3, setLevel3] = React.useState<string>("");
  const [showCopied, setShowCopied] = React.useState(false);

  // Parse incoming value
  React.useEffect(() => {
    if (selectedValue && selectedValue !== getCombinedValue()) {
      const parts = selectedValue.split(" / ");
      if (parts.length === 3) {
        setLevel1(parts[0]);
        setLevel2(parts[1]);
        setLevel3(parts[2]);
      }
    }
  }, [selectedValue]);

  // Get combined value
  const getCombinedValue = (): string => {
    if (level1 && level2 && level3) {
      return `${level1} / ${level2} / ${level3}`;
    }
    return "";
  };

  // Update parent when values change
  React.useEffect(() => {
    const combined = getCombinedValue();
    if (combined !== selectedValue) {
      onValueChange(combined);
    }
  }, [level1, level2, level3]);

  // Get dropdown options
  const level1Options: IDropdownOption[] = Object.keys(hierarchyData).map(key => ({
    key: key,
    text: key,
  }));

  const level2Options: IDropdownOption[] = level1 && hierarchyData[level1]
    ? Object.keys(hierarchyData[level1]).map(key => ({
        key: key,
        text: key,
      }))
    : [];

  const level3Options: IDropdownOption[] = level1 && level2 && hierarchyData[level1]?.[level2]
    ? hierarchyData[level1][level2].map(item => ({
        key: item,
        text: item,
      }))
    : [];

  // Handle level changes
  const onLevel1Change = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      setLevel1(option.key as string);
      setLevel2("");
      setLevel3("");
    }
  };

  const onLevel2Change = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      setLevel2(option.key as string);
      setLevel3("");
    }
  };

  const onLevel3Change = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      setLevel3(option.key as string);
    }
  };

  // Reset all selections
  const handleReset = () => {
    setLevel1("");
    setLevel2("");
    setLevel3("");
    onValueChange("");
  };

  // Copy to clipboard
  const handleCopy = () => {
    const combined = getCombinedValue();
    if (combined) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(combined).then(() => {
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        });
      }
    }
  };

  const stackTokens: IStackTokens = { childrenGap: 16 };
  const sectionTokens: IStackTokens = { childrenGap: 8 };

  const containerStyle = mergeStyles({
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  });

  const titleStyle = mergeStyles({
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
  });

  const descriptionStyle = mergeStyles({
    fontSize: '14px',
    color: '#605e5c',
    marginBottom: '16px',
  });

  const outputStyle = mergeStyles({
    padding: '12px 16px',
    backgroundColor: '#f3f2f1',
    borderRadius: '4px',
    borderLeft: '4px solid #0078d4',
    fontSize: '15px',
    fontWeight: 500,
  });

  const displayValue = getCombinedValue() || (level1 && level2 ? `${level1} / ${level2} / ...` : level1 ? `${level1} / ...` : "Select all three levels to generate value...");

  const isComplete = level1 && level2 && level3;

  return (
    <div className={containerStyle}>
      <Stack tokens={stackTokens}>
        <Stack.Item>
          <Text className={titleStyle}>Cascading Selector Control</Text>
          <Text className={descriptionStyle}>
            Select from three hierarchical levels to build a combined value. Each selection unlocks the next level.
          </Text>
        </Stack.Item>

        <Stack tokens={sectionTokens}>
          <Label required>Level 1 - Primary Category</Label>
          <Dropdown
            placeholder="Select primary category..."
            options={level1Options}
            selectedKey={level1 || undefined}
            onChange={onLevel1Change}
            styles={{
              dropdown: { width: '100%' },
            }}
          />
        </Stack>

        {level1 && (
          <Stack tokens={sectionTokens}>
            <Label required>Level 2 - Sub-Category</Label>
            <Dropdown
              placeholder="Select sub-category..."
              options={level2Options}
              selectedKey={level2 || undefined}
              onChange={onLevel2Change}
              disabled={!level1}
              styles={{
                dropdown: { width: '100%' },
              }}
            />
          </Stack>
        )}

        {level2 && (
          <Stack tokens={sectionTokens}>
            <Label required>Level 3 - Specific Item</Label>
            <Dropdown
              placeholder="Select specific item..."
              options={level3Options}
              selectedKey={level3 || undefined}
              onChange={onLevel3Change}
              disabled={!level2}
              styles={{
                dropdown: { width: '100%' },
              }}
            />
          </Stack>
        )}

        <Separator />

        <Stack tokens={sectionTokens}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Label>Combined Value</Label>
            {isComplete && (
              <Text
                styles={{
                  root: {
                    padding: '4px 12px',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    color: '#0078d4',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                  },
                }}
              >
                Complete
              </Text>
            )}
          </Stack>

          <Stack horizontal verticalAlign="center">
            <Stack.Item grow>
              <div className={outputStyle}>
                {displayValue}
              </div>
            </Stack.Item>
            {isComplete && (
              <IconButton
                iconProps={{ iconName: 'Copy' }}
                title="Copy to clipboard"
                ariaLabel="Copy"
                onClick={handleCopy}
                styles={{
                  root: {
                    marginLeft: '8px',
                  },
                }}
              />
            )}
          </Stack>

          {showCopied && (
            <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
              Copied to clipboard!
            </MessageBar>
          )}

          {level1 && !level2 && (
            <Text variant="small" styles={{ root: { color: '#605e5c' } }}>
              Continue by selecting a sub-category
            </Text>
          )}

          {level2 && !level3 && (
            <Text variant="small" styles={{ root: { color: '#605e5c' } }}>
              Complete by selecting a specific item
            </Text>
          )}
        </Stack>

        <Stack.Item>
          <PrimaryButton
            text="Reset Selection"
            iconProps={{ iconName: 'Clear' }}
            onClick={handleReset}
            disabled={!level1 && !level2 && !level3}
            styles={{
              root: {
                backgroundColor: '#a4262c',
                borderColor: '#a4262c',
              },
              rootHovered: {
                backgroundColor: '#8e1f25',
                borderColor: '#8e1f25',
              },
            }}
          />
        </Stack.Item>

        <Separator />

        <Stack tokens={sectionTokens}>
          <Label>Current Selections</Label>
          <Stack horizontal tokens={{ childrenGap: 8 }} wrap>
            {level1 && (
              <Text
                styles={{
                  root: {
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    border: '1px solid rgba(0, 120, 212, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  },
                }}
              >
                <span style={{ color: '#605e5c', fontSize: '11px', marginRight: '4px' }}>L1:</span>
                {level1}
              </Text>
            )}
            {level2 && (
              <Text
                styles={{
                  root: {
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    border: '1px solid rgba(0, 120, 212, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  },
                }}
              >
                <span style={{ color: '#605e5c', fontSize: '11px', marginRight: '4px' }}>L2:</span>
                {level2}
              </Text>
            )}
            {level3 && (
              <Text
                styles={{
                  root: {
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    border: '1px solid rgba(0, 120, 212, 0.3)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  },
                }}
              >
                <span style={{ color: '#605e5c', fontSize: '11px', marginRight: '4px' }}>L3:</span>
                {level3}
              </Text>
            )}
            {!level1 && !level2 && !level3 && (
              <Text variant="small" styles={{ root: { color: '#605e5c' } }}>
                No selections made yet
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
