import { ComponentFactoryResolver, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextViewComponent } from './components/text-view/text-view.component';
import { NumberViewComponent } from './components/number-view/number-view.component';
import { NumberInputComponent } from '../edit-components/components/number-input/number-input.component';
import { BaseDynamicForms } from '../../models/base-dynamic-forms';
import { ViewLongTextComponent } from './components/view-long-text/view-long-text.component';

@NgModule({
    declarations: [
        TextViewComponent,
        NumberViewComponent,
        ViewLongTextComponent,
    ],
    imports: [CommonModule],
})
export class ViewComponentsModule extends BaseDynamicForms {
    /**
     * @description
     * Add the components you want to expose as a dynamic component
     */
    dynamicComponents: Type<any>[] = [
        TextViewComponent,
        NumberInputComponent,
        ViewLongTextComponent,
    ];
    constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
        super(componentFactoryResolver);
    }
}
