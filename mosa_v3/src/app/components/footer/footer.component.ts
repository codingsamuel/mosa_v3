import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconAnchor } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatIcon,
        MatIconAnchor,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {

    public readonly year = new Date().getFullYear();

}
