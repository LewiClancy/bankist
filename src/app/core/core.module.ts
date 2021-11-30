import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ToolbarComponent, LinkItemComponent],
  imports: [SharedModule, RouterModule, AngularMaterialModule],
  exports: [ToolbarComponent],
})
export class CoreModule {}
