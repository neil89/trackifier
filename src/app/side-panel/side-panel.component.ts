import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
    AnimateOnScrollModule
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {

  sidebarVisible = false;

  closeCallback(e: any) {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
