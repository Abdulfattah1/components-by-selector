import {
  Component,
  ComponentRef,
  VERSION,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Store } from "@ngxs/store";
import { DynamicComponentService } from "./common/dynamic-component.service";
import {
  RegisterEditComponents,
  RegisterViewComponents,
} from "./dynamic-components/dynamic-components.actions";

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
      this.loading = true;
    }, 1000);
  }

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  showComponent = false;
  constructor(
    private componentService: DynamicComponentService,
    private store: Store
  ) {
    this.data = {
      firstName: "abdel fattah",
      lastName: "Khudari",
    };
  }

  addDynamicComponent() {
    this.componentService
      .getComponentBySelector("app-dynamic1", () =>
        import("./child1/child1.module").then((m) => m.Child1Module)
      )
      .then((componentRef) => {
        this.container.insert(componentRef.hostView);
      });
  }

  getModuleLoader() {
    return () => import("./child1/child1.module").then((m) => m.Child1Module);
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
