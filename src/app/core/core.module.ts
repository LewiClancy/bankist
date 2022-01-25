import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LinkItemComponent } from './components/link-item/link-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AlertComponent } from './components/alert/alert.component';
import { NavLinksComponent } from './components/nav-links/nav-links.component';
import { FirestoreDatePipe } from './pipes/firestore-date.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    LinkItemComponent,
    AlertComponent,
    NavLinksComponent,
  ],
  imports: [SharedModule, RouterModule, AngularMaterialModule],
  exports: [ToolbarComponent, AlertComponent],
  providers: [],
})
export class CoreModule {}
