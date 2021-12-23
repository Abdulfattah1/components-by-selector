import { ComponentFactoryResolver, NgModule, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextInputComponent } from "./components/text-input/text-input.component";
import { NumberInputComponent } from "./components/number-input/number-input.component";
import { BaseDynamicForms } from "../../models/base-dynamic-forms";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [TextInputComponent, NumberInputComponent],
  imports: [CommonModule, FormsModule],
})
export class EditComponentsModule extends BaseDynamicForms {
  /**
   * @description
   * Add the components you want to expose as a dynamic component
   */
  dynamicComponents: Type<any>[] = [TextInputComponent, NumberInputComponent];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
