import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconAnchor } from '@angular/material/button';
import { ILink } from '../../models/link.model';
import cvData from '../../../assets/raw/profile.json';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatIcon,
        MatIconAnchor,
        NgOptimizedImage,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {

    @Input()
    public socialMedia: ILink[];

    public readonly year = new Date().getFullYear();

    protected readonly cvData = cvData;
}
