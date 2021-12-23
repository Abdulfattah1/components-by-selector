import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements OnInit {
  value: any;

  onChange: any = () => {};
  onTouch: any = () => {};
  onValidationChange: any = () => {};

  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  valueChanges(): void {
    this.onChange(this.value);
  }

  /**
   *
   * @param str string you want to check its value
   * @returns Returns true in case the string is empty
   * @TODO Move this to a utils service
   */
  isBlank(str: string): boolean {
    return !str || /^\s*$/.test(str);
  }
}
