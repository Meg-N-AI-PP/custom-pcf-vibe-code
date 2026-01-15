import { IInputs, IOutputs } from "./generated/ManifestTypes";

interface HierarchyData {
  [key: string]: {
    [key: string]: string[]
  }
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

export class CascadingSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _notifyOutputChanged: () => void;
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  
  // Control elements
  private _level1Select: HTMLSelectElement;
  private _level2Select: HTMLSelectElement;
  private _level3Select: HTMLSelectElement;
  private _outputInput: HTMLInputElement;
  private _resetButton: HTMLButtonElement;
  private _copyButton: HTMLButtonElement;
  
  // State
  private _level1Value: string = "";
  private _level2Value: string = "";
  private _level3Value: string = "";
  private _selectedValue: string = "";

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;

    // Create the main container
    const mainContainer = document.createElement("div");
    mainContainer.className = "cascading-selector-container";

    // Create the card
    const card = document.createElement("div");
    card.className = "cascading-selector-card";

    // Title and description
    const title = document.createElement("h1");
    title.className = "cascading-selector-title";
    title.textContent = "Cascading Selector Control";
    card.appendChild(title);

    const description = document.createElement("p");
    description.className = "cascading-selector-description";
    description.textContent = "Select from three hierarchical levels to build a combined value. Each selection unlocks the next level.";
    card.appendChild(description);

    // Level 1 Section
    const level1Section = document.createElement("div");
    level1Section.className = "cascading-selector-section";
    
    const level1Label = document.createElement("label");
    level1Label.className = "cascading-selector-label";
    level1Label.textContent = "Level 1 - Primary Category";
    level1Section.appendChild(level1Label);

    this._level1Select = document.createElement("select");
    this._level1Select.className = "cascading-selector-select";
    this._level1Select.innerHTML = '<option value="">Select primary category...</option>';
    Object.keys(hierarchyData).forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      this._level1Select.appendChild(option);
    });
    this._level1Select.addEventListener("change", this._onLevel1Change.bind(this));
    level1Section.appendChild(this._level1Select);
    card.appendChild(level1Section);

    // Arrow
    const arrow1 = document.createElement("div");
    arrow1.className = "cascading-selector-arrow";
    arrow1.innerHTML = "&#8595;"; // Down arrow
    card.appendChild(arrow1);

    // Level 2 Section
    const level2Section = document.createElement("div");
    level2Section.className = "cascading-selector-section";
    
    const level2Label = document.createElement("label");
    level2Label.className = "cascading-selector-label";
    level2Label.textContent = "Level 2 - Sub-Category";
    level2Section.appendChild(level2Label);

    this._level2Select = document.createElement("select");
    this._level2Select.className = "cascading-selector-select";
    this._level2Select.innerHTML = '<option value="">Select sub-category...</option>';
    this._level2Select.disabled = true;
    this._level2Select.addEventListener("change", this._onLevel2Change.bind(this));
    level2Section.appendChild(this._level2Select);
    card.appendChild(level2Section);

    // Arrow
    const arrow2 = document.createElement("div");
    arrow2.className = "cascading-selector-arrow";
    arrow2.innerHTML = "&#8595;"; // Down arrow
    card.appendChild(arrow2);

    // Level 3 Section
    const level3Section = document.createElement("div");
    level3Section.className = "cascading-selector-section";
    
    const level3Label = document.createElement("label");
    level3Label.className = "cascading-selector-label";
    level3Label.textContent = "Level 3 - Specific Item";
    level3Section.appendChild(level3Label);

    this._level3Select = document.createElement("select");
    this._level3Select.className = "cascading-selector-select";
    this._level3Select.innerHTML = '<option value="">Select specific item...</option>';
    this._level3Select.disabled = true;
    this._level3Select.addEventListener("change", this._onLevel3Change.bind(this));
    level3Section.appendChild(this._level3Select);
    card.appendChild(level3Section);

    // Separator
    const separator = document.createElement("div");
    separator.className = "cascading-selector-separator";
    card.appendChild(separator);

    // Output Section
    const outputSection = document.createElement("div");
    outputSection.className = "cascading-selector-output";

    const outputLabelContainer = document.createElement("div");
    outputLabelContainer.className = "cascading-selector-output-label";

    const outputLabel = document.createElement("label");
    outputLabel.className = "cascading-selector-label";
    outputLabel.textContent = "Combined Value";
    outputLabelContainer.appendChild(outputLabel);

    const completeBadge = document.createElement("span");
    completeBadge.className = "cascading-selector-badge";
    completeBadge.textContent = "Complete";
    completeBadge.style.display = "none";
    completeBadge.id = "completeBadge";
    outputLabelContainer.appendChild(completeBadge);

    outputSection.appendChild(outputLabelContainer);

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "cascading-selector-input-wrapper";

    this._outputInput = document.createElement("input");
    this._outputInput.type = "text";
    this._outputInput.className = "cascading-selector-input";
    this._outputInput.placeholder = "Select all three levels to generate value...";
    this._outputInput.readOnly = true;
    inputWrapper.appendChild(this._outputInput);

    this._copyButton = document.createElement("button");
    this._copyButton.className = "cascading-selector-copy-button";
    this._copyButton.innerHTML = "&#128203;"; // Clipboard icon
    this._copyButton.title = "Copy to clipboard";
    this._copyButton.style.display = "none";
    this._copyButton.addEventListener("click", this._onCopy.bind(this));
    inputWrapper.appendChild(this._copyButton);

    outputSection.appendChild(inputWrapper);
    card.appendChild(outputSection);

    // Actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "cascading-selector-actions";

    this._resetButton = document.createElement("button");
    this._resetButton.className = "cascading-selector-button cascading-selector-button-destructive";
    this._resetButton.textContent = "✕ Reset Selection";
    this._resetButton.disabled = true;
    this._resetButton.addEventListener("click", this._onReset.bind(this));
    actionsDiv.appendChild(this._resetButton);

    card.appendChild(actionsDiv);

    // Current Selections Section
    const selectionsCard = document.createElement("div");
    selectionsCard.className = "cascading-selector-selections";

    const selectionsTitle = document.createElement("h2");
    selectionsTitle.className = "cascading-selector-selections-title";
    selectionsTitle.textContent = "Current Selections";
    selectionsCard.appendChild(selectionsTitle);

    const selectionsBadges = document.createElement("div");
    selectionsBadges.className = "cascading-selector-selections-badges";
    selectionsBadges.id = "selectionsBadges";
    selectionsBadges.innerHTML = '<span class="cascading-selector-no-selection">No selections made yet</span>';
    selectionsCard.appendChild(selectionsBadges);

    mainContainer.appendChild(card);
    mainContainer.appendChild(selectionsCard);

    this._container.appendChild(mainContainer);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this._context = context;
    
    // Update the component with the incoming value if it's different from current state
    const incomingValue = context.parameters.SelectedValue.raw;
    if (incomingValue && incomingValue !== this._selectedValue) {
      // Try to parse the incoming value (format: "Level1 / Level2 / Level3")
      const parts = incomingValue.split(" / ");
      if (parts.length === 3) {
        this._level1Value = parts[0];
        this._level2Value = parts[1];
        this._level3Value = parts[2];
        this._selectedValue = incomingValue;
        
        // Update UI
        this._level1Select.value = this._level1Value;
        this._populateLevel2();
        this._level2Select.value = this._level2Value;
        this._populateLevel3();
        this._level3Select.value = this._level3Value;
        this._updateOutput();
      }
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {
      SelectedValue: this._selectedValue
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Cleanup
  }

  private _onLevel1Change(): void {
    this._level1Value = this._level1Select.value;
    this._level2Value = "";
    this._level3Value = "";
    
    this._populateLevel2();
    this._clearLevel3();
    this._updateOutput();
  }

  private _onLevel2Change(): void {
    this._level2Value = this._level2Select.value;
    this._level3Value = "";
    
    this._populateLevel3();
    this._updateOutput();
  }

  private _onLevel3Change(): void {
    this._level3Value = this._level3Select.value;
    this._updateOutput();
  }

  private _populateLevel2(): void {
    this._level2Select.innerHTML = '<option value="">Select sub-category...</option>';
    
    if (this._level1Value && hierarchyData[this._level1Value]) {
      const options = Object.keys(hierarchyData[this._level1Value]);
      options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        this._level2Select.appendChild(optionElement);
      });
      this._level2Select.disabled = false;
    } else {
      this._level2Select.disabled = true;
    }
  }

  private _populateLevel3(): void {
    this._level3Select.innerHTML = '<option value="">Select specific item...</option>';
    
    if (this._level1Value && this._level2Value && hierarchyData[this._level1Value]?.[this._level2Value]) {
      const options = hierarchyData[this._level1Value][this._level2Value];
      options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        this._level3Select.appendChild(optionElement);
      });
      this._level3Select.disabled = false;
    } else {
      this._level3Select.disabled = true;
    }
  }

  private _clearLevel3(): void {
    this._level3Select.innerHTML = '<option value="">Select specific item...</option>';
    this._level3Select.disabled = true;
  }

  private _updateOutput(): void {
    let combinedValue = "";
    
    if (this._level1Value && this._level2Value && this._level3Value) {
      combinedValue = `${this._level1Value} / ${this._level2Value} / ${this._level3Value}`;
    } else if (this._level1Value && this._level2Value) {
      combinedValue = `${this._level1Value} / ${this._level2Value} / ...`;
    } else if (this._level1Value) {
      combinedValue = `${this._level1Value} / ...`;
    }
    
    this._selectedValue = this._level1Value && this._level2Value && this._level3Value ? combinedValue : "";
    this._outputInput.value = combinedValue;
    
    // Update UI states
    const completeBadge = document.getElementById("completeBadge");
    if (completeBadge) {
      completeBadge.style.display = this._level1Value && this._level2Value && this._level3Value ? "inline-block" : "none";
    }
    
    this._copyButton.style.display = this._level1Value && this._level2Value && this._level3Value ? "block" : "none";
    this._resetButton.disabled = !this._level1Value && !this._level2Value && !this._level3Value;
    
    // Update selections badges
    this._updateSelectionsBadges();
    
    // Notify framework of output change
    this._notifyOutputChanged();
  }

  private _updateSelectionsBadges(): void {
    const container = document.getElementById("selectionsBadges");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (!this._level1Value && !this._level2Value && !this._level3Value) {
      container.innerHTML = '<span class="cascading-selector-no-selection">No selections made yet</span>';
      return;
    }
    
    if (this._level1Value) {
      const badge = document.createElement("span");
      badge.className = "cascading-selector-selection-badge";
      badge.innerHTML = `<span class="cascading-selector-selection-badge-prefix">L1:</span>${this._level1Value}`;
      container.appendChild(badge);
    }
    
    if (this._level2Value) {
      const badge = document.createElement("span");
      badge.className = "cascading-selector-selection-badge";
      badge.innerHTML = `<span class="cascading-selector-selection-badge-prefix">L2:</span>${this._level2Value}`;
      container.appendChild(badge);
    }
    
    if (this._level3Value) {
      const badge = document.createElement("span");
      badge.className = "cascading-selector-selection-badge";
      badge.innerHTML = `<span class="cascading-selector-selection-badge-prefix">L3:</span>${this._level3Value}`;
      container.appendChild(badge);
    }
  }

  private _onReset(): void {
    this._level1Value = "";
    this._level2Value = "";
    this._level3Value = "";
    this._selectedValue = "";
    
    this._level1Select.value = "";
    this._level2Select.value = "";
    this._level2Select.disabled = true;
    this._level3Select.value = "";
    this._level3Select.disabled = true;
    
    this._updateOutput();
  }

  private _onCopy(): void {
    if (this._selectedValue) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(this._selectedValue).then(() => {
          this._copyButton.innerHTML = "&#10004;"; // Check mark
          setTimeout(() => {
            this._copyButton.innerHTML = "&#128203;"; // Clipboard icon
          }, 2000);
        }).catch((err) => {
          console.error("Failed to copy to clipboard:", err);
          // Show error feedback to user
          this._copyButton.innerHTML = "&#10060;"; // X mark
          setTimeout(() => {
            this._copyButton.innerHTML = "&#128203;"; // Clipboard icon
          }, 2000);
        });
      } else {
        // Fallback: create temporary textarea for copying
        try {
          const textarea = document.createElement("textarea");
          textarea.value = this._selectedValue;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textarea);
          
          if (successful) {
            this._copyButton.innerHTML = "&#10004;"; // Check mark
            setTimeout(() => {
              this._copyButton.innerHTML = "&#128203;"; // Clipboard icon
            }, 2000);
          } else {
            console.warn("Copy command failed");
            this._copyButton.innerHTML = "&#10060;"; // X mark
            setTimeout(() => {
              this._copyButton.innerHTML = "&#128203;"; // Clipboard icon
            }, 2000);
          }
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
      }
    }
  }
}
