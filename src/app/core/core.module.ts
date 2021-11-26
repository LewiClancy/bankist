import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, LinkItemComponent],
  imports: [RouterModule, AngularMaterialModule],
  exports: [ToolbarComponent],
})
export class CoreModule {}
