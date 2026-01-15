import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { CascadingSelectorComponent } from './CascadingSelectorComponent';

// Initialize Fluent UI icons
initializeIcons();

export class CascadingSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _notifyOutputChanged: () => void;
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
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

    // Initialize selected value from context
    this._selectedValue = context.parameters.SelectedValue.raw || "";

    // Render the React component
    this.renderComponent();
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this._context = context;
    
    // Update the selected value from incoming context
    const incomingValue = context.parameters.SelectedValue.raw;
    if (incomingValue !== this._selectedValue) {
      this._selectedValue = incomingValue || "";
      this.renderComponent();
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
    ReactDOM.unmountComponentAtNode(this._container);
  }

  /**
   * Renders the React component
   */
  private renderComponent(): void {
    ReactDOM.render(
      React.createElement(CascadingSelectorComponent, {
        selectedValue: this._selectedValue,
        onValueChange: this.onValueChange.bind(this),
      }),
      this._container
    );
  }

  /**
   * Called when the value changes in the React component
   */
  private onValueChange(value: string): void {
    this._selectedValue = value;
    this._notifyOutputChanged();
  }
}
