export interface BaseComponentDefinition {
  /**
   * Name of the dynamic component
   */
  name: string;
  /**
   * Description of the dynamic component
   */
  description: string;
  /**
   * General data type Text , Number etc...
   */
  dataType: "test";
  /**
   * Edit or view component
   */
  componentType: "edit" | "view";
  /**
   * Angular component selector
   */
  componentSelector: string;
  /**
   * Sub related components
   */
  subComponents: BaseComponentDefinition[];
}
