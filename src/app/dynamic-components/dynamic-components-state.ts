import { ComponentFactory, Injectable } from "@angular/core";
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { DynamicComponentsService } from "../shared/dynamic-forms/services/dynamic-components.service";
import {
  RegisterEditComponents,
  RegisterViewComponents,
} from "./dynamic-components.actions";
export class ComponentStateModel {
  editComponentsFactories: Map<string, ComponentFactory<any>>;
  viewComponentsFactories: Map<string, ComponentFactory<any>>;
}

@State<ComponentStateModel>({
  name: "dynamicComponents",
  defaults: {
    editComponentsFactories: null,
    viewComponentsFactories: null,
  },
})
@Injectable()
export class ComponentState {
  // Selectors
  static editComponentFactoryBySelectorName(
    selector: string
  ): (state: ComponentStateModel) => ComponentFactory<any> {
    return createSelector([ComponentState], (state: ComponentStateModel) =>
      state.editComponentsFactories.get(selector)
    );
  }

  static viewComponentFactoryBySelectorName(
    selector: string
  ): (state: ComponentStateModel) => ComponentFactory<any> {
    return createSelector([ComponentState], (state: ComponentStateModel) =>
      state.viewComponentsFactories.get(selector)
    );
  }

  @Selector([ComponentState])
  static editComponentsFactories(
    state: ComponentStateModel
  ): Map<string, ComponentFactory<any>> {
    return state.editComponentsFactories;
  }

  @Selector([ComponentState])
  static viewComponentsFactories(
    state: ComponentStateModel
  ): Map<string, ComponentFactory<any>> {
    return state.viewComponentsFactories;
  }

  constructor(private dynamicComponentsService: DynamicComponentsService) {
    this.dynamicComponentsService.registerModuleComponents(
      this.getViewComponentModuleLoader()
    );
  }

  @Action(RegisterEditComponents)
  RegisterEditComponents({ setState }: StateContext<ComponentStateModel>) {
    this.dynamicComponentsService
      .registerModuleComponents(this.getEditComponentModuleLoader())
      .then((res) => {
        setState(
          patch<ComponentStateModel>({
            editComponentsFactories: res,
          })
        );
      });
  }

  @Action(RegisterViewComponents)
  RegisterViewComponents({ setState }: StateContext<ComponentStateModel>) {
    this.dynamicComponentsService
      .registerModuleComponents(this.getViewComponentModuleLoader())
      .then((res) => {
        setState(
          patch<ComponentStateModel>({
            viewComponentsFactories: res,
          })
        );
      });
  }

  getEditComponentModuleLoader() {
    return () =>
      import(
        "../shared/dynamic-forms/modules/edit-components/edit-components.module"
      ).then((m) => m.EditComponentsModule);
  }

  getViewComponentModuleLoader() {
    return () =>
      import(
        "../shared/dynamic-forms/modules/view-components/view-components.module"
      ).then((m) => m.ViewComponentsModule);
  }
}
