import { BaseComponentDefinition } from "../../models/base-dynamic-component.interface";

export const VIEW_COMPONENTS: BaseComponentDefinition[] = [
  {
    name: "View Number",
    componentSelector: "app-view-number",
    componentType: "view",
    dataType: "test",
    description: "Display number",
    subComponents: [],
  },
  {
    name: "View Text",
    componentSelector: "app-view-text",
    componentType: "view",
    dataType: "test",
    description: "Display Text",
    subComponents: [],
  },
  {
    name: "View Long Text",
    componentSelector: "app-view-long-text",
    componentType: "view",
    dataType: "test",
    description: "Display Long Text",
    subComponents: [],
  },
];
