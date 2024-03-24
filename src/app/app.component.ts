import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ RouterOutlet, MenuComponent ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'codingsamuel';


    constructor(
        private readonly myDomSanitizer: DomSanitizer,
        private readonly myMatIconRegistry: MatIconRegistry,
    ) {
        this.myMatIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
        this.myMatIconRegistry.addSvgIcon('github', this.myDomSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/github.svg'));
        this.myMatIconRegistry.addSvgIcon('instagram', this.myDomSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/instagram.svg'));
        this.myMatIconRegistry.addSvgIcon('xing', this.myDomSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/xing.svg'));
    }

}
