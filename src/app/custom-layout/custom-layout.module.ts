import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../@vex/layout/layout.module';
import { CustomLayoutComponent } from './custom-layout.component';
import { SidenavModule } from '../../@vex/layout/sidenav/sidenav.module';
import { ToolbarModule } from '../../@vex/layout/toolbar/toolbar.module';
import { ConfigPanelModule } from '../../@vex/components/config-panel/config-panel.module';
import { SidebarModule } from '../../@vex/components/sidebar/sidebar.module';
import { QuickpanelModule } from '../../@vex/layout/quickpanel/quickpanel.module';
import { CustomRoutingModule } from './custom-routing.module';

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    ConfigPanelModule,

    LayoutModule,
    QuickpanelModule,
    SidenavModule,
    SidebarModule,
    ToolbarModule,
    CustomRoutingModule
  ]
})
export class CustomLayoutModule { }
