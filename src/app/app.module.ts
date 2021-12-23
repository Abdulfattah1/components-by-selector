import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { DynamicSelectorComponent } from "./dynamic-selector/dynamic-selector.component";
import { NgxsModule, Store } from "@ngxs/store";
import { ComponentState } from "./dynamic-components/dynamic-components-state";
import { DynamicFormsModule } from "./shared/dynamic-forms/dynamic-forms.module";
import {
  RegisterEditComponents,
  RegisterViewComponents,
} from "./dynamic-components/dynamic-components.actions";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([ComponentState]),
    NgxsLoggerPluginModule.forRoot(),
    DynamicFormsModule,
  ],
  declarations: [AppComponent, DynamicSelectorComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
