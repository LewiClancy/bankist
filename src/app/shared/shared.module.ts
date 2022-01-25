import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { AlertComponent } from '../core/components/alert/alert.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AutofocusDirective } from './directives/auto-focus-directive/autofocus.directive';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [
    AutofocusDirective,
    LoadingPageComponent,
    ProgressBarComponent,
    ErrorPageComponent,
  ],
  exports: [
    AutofocusDirective,
    CommonModule,
    AngularMaterialModule,
    LoadingPageComponent,
    ProgressBarComponent,
    ErrorPageComponent,
  ],
})
export class SharedModule {}
