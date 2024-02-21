import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderBarComponent, SidePanelComponent, RouterOutlet]
})
export class AppComponent {
  title = 'trackifier';

  constructor(
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
