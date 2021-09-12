import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { ToolbarUserModule } from './toolbar-user/toolbar-user.module';
import { IconModule } from '@visurel/iconify-angular';
import { NavigationModule } from '../../../../../@vex/layout/navigation/navigation.module';
import { RouterModule } from '@angular/router';
import { NavigationItemModule } from '../../../../../@vex/components/navigation-item/navigation-item.module';
import { MegaMenuModule } from '../../../../../@vex/components/mega-menu/mega-menu.module';
import { ContainerModule } from '../../../../../@vex/directives/container/container.module';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    ToolbarUserModule,
    IconModule,
    NavigationModule,
    RouterModule,
    NavigationItemModule,
    MegaMenuModule,
    ContainerModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
