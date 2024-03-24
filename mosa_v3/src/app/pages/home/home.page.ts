import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import cvDataDef from '../../../assets/i18n/en-UK/cv-info.json';
import { AsPipe } from '../../pipes/as.pipe';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FooterComponent } from '../../components/footer/footer.component';

// Type definitions
type CvInfoType = typeof cvDataDef;
type CvInfoArrayType = CvInfoType extends (infer T) ? T : CvInfoType;

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ HeaderComponent, MatIcon, NgTemplateOutlet, AsPipe, JsonPipe, MatChipSet, MatChip, MatIconAnchor, MatButton, MatCard, MatCardTitle, MatCardHeader, MatCardContent, FooterComponent ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePage {

    public cvData: CvInfoArrayType = cvDataDef;

    protected readonly ListType: Record<string, string>;

    constructor() {
        console.log('cvData', cvDataDef);
    }

}
