import {
    Compiler,
    ComponentFactory,
    ComponentRef,
    Injectable,
    Injector,
    NgModuleFactory,
} from '@angular/core';
import { BaseDynamicForms } from '../models/base-dynamic-forms';

@Injectable({
    providedIn: 'root',
})
export class DynamicComponentsService {
    constructor(private injector: Injector) {}

    registerModuleComponents(moduleLoaderFunction: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getModuleFactory(moduleLoaderFunction).then(
                (moduleFactory) => {
                    const _module = moduleFactory.create(this.injector);
                    if (_module.instance instanceof BaseDynamicForms) {
                        _module.instance.populateRegistry();
                        const _components =
                            _module.instance._selectorFactoryMap;
                        resolve(_components);
                    } else {
                        reject(
                            'Module should extend BaseModule to use "string" based component selector'
                        );
                    }
                }
            );
        });
    }

    getComponentBySelector(
        componentSelector: string,
        moduleLoaderFunction: () => Promise<any>
    ): Promise<ComponentRef<unknown>> {
        return this.getModuleFactory(moduleLoaderFunction).then(
            (moduleFactory) => {
                const module = moduleFactory.create(this.injector);
                if (module.instance instanceof BaseDynamicForms) {
                    const compFactory: ComponentFactory<any> =
                        module.instance.getComponentFactory(componentSelector);
                    return compFactory.create(
                        module.injector,
                        [],
                        null,
                        module
                    );
                } else {
                    throw new Error(
                        'Module should extend BaseModule to use "string" based component selector'
                    );
                }
            }
        );
    }

    async getModuleFactory(
        moduleLoaderFunction: () => Promise<NgModuleFactory<any>>
    ) {
        const ngModuleOrNgModuleFactory = await moduleLoaderFunction();
        let moduleFactory;
        if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
            // AOT at runtime
            moduleFactory = ngModuleOrNgModuleFactory;
        } else {
            moduleFactory = await this.injector
                .get(Compiler)
                .compileModuleAsync(ngModuleOrNgModuleFactory);
        }
        return moduleFactory;
    }
}
