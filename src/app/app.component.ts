import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      HeaderBarComponent,
      SidePanelComponent,
      RouterOutlet,
      TranslateModule
    ]
})
export class AppComponent {
  title = 'trackifier';

  constructor(
    private primeNgConfig: PrimeNGConfig,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    registerLocaleData('en');
    registerLocaleData(localeEs, 'es');

    const browserLang = translate.getBrowserLang();
    let language = browserLang?.match(/en|es/) ? browserLang : 'en';
    this.changeLanguage(language);
  }

  public changeLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.primeNgConfig.ripple = true;

    this.translate.get('primeNg')
      .subscribe(res => this.primeNgConfig.setTranslation(res));
    // this.translate.get('APP.TRACKIFIER').subscribe((res: string) => {
    //   console.log(res);
    // });
  }
}
