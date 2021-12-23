import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDynamicComponentDirective } from './directives/edit-dynamic-component.directive';

@NgModule({
    declarations: [EditDynamicComponentDirective],
    imports: [CommonModule],
    exports: [EditDynamicComponentDirective],
})
export class DynamicFormsModule {}
