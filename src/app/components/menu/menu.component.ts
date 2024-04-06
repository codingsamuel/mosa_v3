import { Component, HostListener, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { animate, query, sequence, stagger, style, transition, trigger } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as supportedLangs from '../../../assets/i18n/supported-languages.json';

export const DropDownAnimation = trigger('dropDownMenu', [
    transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        query('.menu-item', [
            style({ opacity: 0, transform: 'translateY(-50px)' }),
        ]),
        sequence([
            animate('200ms', style({ height: '*' })),
            query('.menu-item', [
                stagger(-50, [
                    animate('400ms ease', style({ opacity: 1, transform: 'none' })),
                ]),
            ]),
        ]),
    ]),

    transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        query('.menu-item', [ style({ opacity: 1, transform: 'none' }) ]),
        sequence([
            query('.menu-item', [
                stagger(50, [
                    animate(
                        '400ms ease',
                        style({ opacity: 0, transform: 'translateY(-50px)' }),
                    ),
                ]),
            ]),
            animate('200ms', style({ height: 0 })),
        ]),
    ]),
]);

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        MatToolbar,
        RouterLink,
        RouterLinkActive,
        AsyncPipe,
        MatIconButton,
        MatIcon,
        MatButton,
        NgOptimizedImage,
        TranslateModule,
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    animations: [ DropDownAnimation ],
})
export class MenuComponent implements OnInit {

    public readonly innerWidth$: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

    public isMenuOpen: boolean = window.innerWidth >= 1000;
    public currentLang$: BehaviorSubject<string> = new BehaviorSubject<string>('en-UK');
    public availableLangs$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(
        private readonly myTranslateService: TranslateService,
    ) {
    }

    @HostListener('window:resize', [ '$event' ])
    public onResize(_event: Event): void {
        this.innerWidth$.next(window.innerWidth);
        if (window.innerWidth >= 1000 && !this.isMenuOpen) {
            this.isMenuOpen = true;
        }
    }

    public ngOnInit(): void {
        this.changeLang(this.myTranslateService.currentLang || this.myTranslateService.defaultLang);
        this.availableLangs$.next(supportedLangs.supportedLanguages);
    }

    public scrollTo(element: string): void {
        const el: HTMLElement = document.getElementById(element);
        el?.scrollIntoView({ behavior: 'smooth' });
    }

    public changeLang(lang: string): void {
        if (lang !== this.myTranslateService.currentLang) {
            this.myTranslateService.use(lang);
        }

        this.currentLang$.next(lang);
    }

}
