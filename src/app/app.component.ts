import {
  Component,
  ComponentRef,
  VERSION,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Store } from "@ngxs/store";
import { ComponentState } from "./dynamic-components/dynamic-components-state";
import {
  RegisterEditComponents,
  RegisterViewComponents,
} from "./dynamic-components/dynamic-components.actions";
import { DynamicComponentsService } from "./shared/dynamic-forms/services/dynamic-components.service";
export interface DynamicContentInputs {
  [k: string]: any;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  data;

  loading: boolean;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.dispatch(new RegisterEditComponents());
    this.store.dispatch(new RegisterViewComponents());
    setTimeout(() => {
      // JUST FOR TESTING
      // IT SHOULD BE HANDELD OTHER WAY IN THE STATE
      this.loading = true;

      this.store
        .select(
          ComponentState.editComponentFactoryBySelectorName("app-text-input")
        )
        .subscribe((data) => {
          this.container.createComponent(data);
        });
    }, 1000);
  }

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  showComponent = false;
  constructor(
    private componentService: DynamicComponentsService,
    private store: Store
  ) {
    this.data = {
      firstName: "abdel fattah",
      lastName: "Khudari",
    };
  }

  addComponentInputs(
    componentRef: ComponentRef<unknown>,
    inputs: DynamicContentInputs
  ) {
    if (componentRef && componentRef.instance && inputs) {
      Object.keys(inputs).forEach(
        (p) => (componentRef.instance[p] = inputs[p])
      );
    }
  }
}
