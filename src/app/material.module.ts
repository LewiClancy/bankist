import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatRippleModule],
  exports: [MatToolbarModule, MatButtonModule, MatRippleModule],
})
export class AngularMaterialModule {}
