import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        MatButton,
        MatIcon,
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    @Input()
    public name: string;

    @Input()
    public branch: string;

    public scrollTo(id: string): void {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

}
