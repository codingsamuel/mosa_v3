import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe, DecimalPipe, JsonPipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import cvDataDef from '../../../assets/raw/profile.json';
import { AsPipe } from '../../pipes/as.pipe';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FooterComponent } from '../../components/footer/footer.component';
import { IProfile } from '../../models/profile.model';
import { TranslateModule } from '@ngx-translate/core';
import { SplitPipe } from '../../pipes/split.pipe';
import { HomeFacade } from '../../services/facades/home.facade';
import { IRating } from '../../models/rating.model';
import { Observable } from 'rxjs';
import { IHomeState } from '../../models/states/home.state';

// Type definitions
// type CvInfoType = typeof cvDataDef;
// type CvInfoArrayType = CvInfoType extends (infer T) ? T : CvInfoType;

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ HeaderComponent, MatIcon, NgTemplateOutlet, AsPipe, JsonPipe, MatChipSet, MatChip, MatIconAnchor, MatCard, MatCardTitle, MatCardHeader, MatCardContent, FooterComponent, MatAnchor, TranslateModule, SplitPipe, AsyncPipe, DecimalPipe, NgOptimizedImage, DatePipe ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {

    public homeState$: Observable<IHomeState>;

    public cvData: IProfile = cvDataDef;

    protected readonly ListType: Record<string, string>;

    constructor(
        private myHomeFacade: HomeFacade,
    ) {
        console.log('cvData', cvDataDef);
    }

    public ngOnInit() {
        this.homeState$ = this.myHomeFacade.subState();

        void this.loadRating();
    }

    public async addRating(value: number): Promise<void> {
        await this.myHomeFacade.addRating(value);
        void this.loadRating();
    }

    private async loadRating(): Promise<void> {
        const rating: IRating = await this.myHomeFacade.loadRating();
        setTimeout(() => {
            if (rating.average > 0) {
                const element: HTMLInputElement = document.getElementById('rating1') as HTMLInputElement;
                element.checked = true;
            }

            if (rating.average >= 1.5) {
                const element: HTMLInputElement = document.getElementById('rating2') as HTMLInputElement;
                element.checked = true;
            }

            if (rating.average >= 2.5) {
                const element: HTMLInputElement = document.getElementById('rating3') as HTMLInputElement;
                element.checked = true;
            }

            if (rating.average >= 3.5) {
                const element: HTMLInputElement = document.getElementById('rating4') as HTMLInputElement;
                element.checked = true;
            }

            if (rating.average >= 4.5) {
                const element: HTMLInputElement = document.getElementById('rating5') as HTMLInputElement;
                element.checked = true;
            }

            console.log('element', document.getElementById('rating1'));
        }, 500);
    }

}
