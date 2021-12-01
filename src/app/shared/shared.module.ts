import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { AutofocusDirective } from './directives/auto-focus-directive/autofocus.directive';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [AutofocusDirective],
  exports: [AutofocusDirective, CommonModule, AngularMaterialModule],
})
export class SharedModule {}
