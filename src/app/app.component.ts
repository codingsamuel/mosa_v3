import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MatIconRegistry } from '@angular/material/icon';

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
        private readonly myMatIconRegistry: MatIconRegistry,
    ) {
        this.myMatIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }

}
