import {
  ComponentRef,
  Directive,
  forwardRef,
  Injector,
  Input,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from "@angular/core";
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { Store } from "@ngxs/store";
import { ComponentState } from "../../../dynamic-components/dynamic-components-state";

@Directive({
  selector: "[appEditDynamicComponent]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditDynamicComponentDirective),
      multi: true,
    },
  ],
})
export class EditDynamicComponentDirective implements OnInit {
  component: ComponentRef<any>;

  constructor(
    private store: Store,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);

    // this.field.renderComponent.editComponentSelector;
    this.store
      .select(
        ComponentState.editComponentFactoryBySelectorName("app-text-input")
      )
      .subscribe((data) => {
        console.log(data);

        this.component = this.viewContainerRef.createComponent(data);
        ngControl.valueAccessor = this.component.instance;
      });
  }
}
