import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@Component({
  selector: 'app-layout-component',
  imports: [
    CommonModule,
    RouterModule,
   NzButtonModule, NzIconModule, NzMenuModule,NzLayoutModule
  ],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css'
})
export class LayoutComponent {
  sidebarItem = [
    {
        label: 'Calendar', path: 'calendar', icon: 'calendar', exact: true, hidden: false
      },
     {
        label: 'Language', path: 'vocabulary-tracker', icon: 'translation', exact: true, hidden: false,
    }
]

 isCollapsed = true;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
