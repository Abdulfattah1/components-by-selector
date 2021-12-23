import {
    ComponentFactory,
    ComponentFactoryResolver,
    Type,
} from '@angular/core';

export abstract class BaseDynamicForms {
    /**
     * @description
     * An array holds the dynamic components the need to be registered in the system
     */
    protected abstract dynamicComponents: Type<any>[];

    /**
     * @description
     * Contains the component-selector as a key the componentFactory as a value
     */
    _selectorFactoryMap: Map<string, ComponentFactory<any>>;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

    /**
     * @description used to fetch a component factory based on a component selector
     * @param selector Component selector name 'app-text-input'
     * @returns Component factory that is used to create new components from it
     */
    public getComponentFactory(selector: string): ComponentFactory<any> {
        if (!this._selectorFactoryMap) {
            this.populateRegistry();
        }
        return this._selectorFactoryMap.get(selector);
    }

    /**
     * @description
     * Regester the passed dynamic components
     * It acts like a entryComponents property in angular
     * It stors in the map the selector of the component as a key and it's factory as a value
     */
    protected populateRegistry() {
        this._selectorFactoryMap = new Map<string, ComponentFactory<any>>();
        if (
            Array.isArray(this.dynamicComponents) &&
            this.dynamicComponents.length > 0
        ) {
            this.dynamicComponents.forEach((compType) => {
                const componentFactory: ComponentFactory<any> =
                    this.componentFactoryResolver.resolveComponentFactory(
                        compType
                    );
                this._selectorFactoryMap.set(
                    componentFactory.selector,
                    componentFactory
                );
            });
        }
    }
}
