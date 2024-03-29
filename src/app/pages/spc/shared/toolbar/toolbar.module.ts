import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarUserModule } from './toolbar-user/toolbar-user.module';

import { ContainerModule } from '../../../../../@vex/directives/container/container.module';
import { MegaMenuModule } from '../../../../../@vex/components/mega-menu/mega-menu.module';
import { NavigationItemModule } from '../../../../../@vex/components/navigation-item/navigation-item.module';
import { NavigationModule } from '../../../../../@vex/layout/navigation/navigation.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ContainerModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MegaMenuModule,
    NavigationItemModule,
    NavigationModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarModule,
    ToolbarUserModule,
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
