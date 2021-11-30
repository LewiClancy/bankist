import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutofocusDirective } from './directives/auto-focus-directive/autofocus.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AutofocusDirective],
  exports: [RouterModule, AutofocusDirective, CommonModule],
})
export class SharedModule {}
