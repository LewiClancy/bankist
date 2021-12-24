import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { AutofocusDirective } from './directives/auto-focus-directive/autofocus.directive';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [AutofocusDirective, LoadingPageComponent],
  exports: [
    AutofocusDirective,
    CommonModule,
    AngularMaterialModule,
    LoadingPageComponent,
  ],
})
export class SharedModule {}
