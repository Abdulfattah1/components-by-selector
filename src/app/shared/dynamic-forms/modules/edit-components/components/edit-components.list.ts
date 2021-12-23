import { BaseComponentDefinition } from "../../../models/base-dynamic-component.interface";

export const EDIT_COMPONENTS: BaseComponentDefinition[] = [
  {
    name: "Edit Number",
    componentSelector: "app-number-input",
    componentType: "edit",
    dataType: "test",
    description: "Edit number",
    subComponents: [],
  },
  {
    name: "Edit Text",
    componentSelector: "app-text-input",
    componentType: "edit",
    dataType: "test",
    description: "Edit Text",
    subComponents: [],
  },
  {
    name: "Edit Long Text",
    componentSelector: "app-long-text-input",
    componentType: "edit",
    dataType: "test",
    description: "Edit Long Text",
    subComponents: [],
  },
];
