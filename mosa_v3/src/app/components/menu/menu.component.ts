import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        MatToolbar,
        MatAnchor,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent {

}
