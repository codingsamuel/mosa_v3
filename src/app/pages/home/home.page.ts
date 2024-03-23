import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ HeaderComponent, MatIcon ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePage {

}
