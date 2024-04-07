import jsPDF from 'jspdf';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { JspdfUtil } from '../utils/jspdf.util';
import { ICvInfo } from '../models/cv/cv-info.model';
import { ICvProfile } from '../models/cv/cv-profile.model';
import { formatDate } from '@angular/common';
import { ICvJourney } from '../models/cv/cv-journey.model';
import { IKeyValue } from '../models/key-value.model';

@Injectable({
    providedIn: 'root',
})
export class PdfGeneratorService {

    constructor(
        private myTranslateService: TranslateService,
    ) {
    }

    public generate(profileData: ICvProfile): void {
        const jspdfUtil: JspdfUtil = new JspdfUtil(new jsPDF('p', 'pt', 'a4'), this.myTranslateService);

        jspdfUtil
            .addFonts('Montserrat', './assets/fonts/montserrat', [ 'Montserrat-Light.ttf', 'Montserrat-Regular.ttf', 'Montserrat-Medium.ttf', 'Montserrat-Bold.ttf' ])
            .addFonts('MaterialSymbols', './assets/fonts/material-symbols', [ 'MaterialSymbols-Outlined.ttf' ])
            .addImages([ { name: 'profile', url: profileData.imageUrl } ]);

        let doc: jsPDF = jspdfUtil.getDoc();

        // Draw header background
        doc.setFillColor('#350c30');
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 148, 'F');

        // Add Profile image
        doc = jspdfUtil.image('profile', { x: -32, y: 32 }, { width: 170, height: 192 }).getDoc();

        // Set Header text
        doc.setTextColor('#FFFFFF');
        doc.setFontSize(28);
        doc.setFont('Montserrat', 'bold');
        doc.text(profileData.firstName.toUpperCase(), 32, 48);
        doc.setFont('Montserrat', 'light');
        doc.text(profileData.lastName.toUpperCase(), 32, 80);
        doc.setFont('Montserrat', 'regular');
        doc.setFontSize(14);
        doc.text(this.myTranslateService.instant(profileData.branch), 32, 112);

        // Reset text color
        doc.setTextColor('#000000');

        // Draw left area
        doc.setFillColor('#EAEAEA');
        doc.rect(0, 149, 210, doc.internal.pageSize.getHeight() - 148, 'F');

        // Add cvInfo sections
        let y = 180;
        profileData.cvInfo.forEach((info: ICvInfo) => {
            // Check if content exceeds page height, if so, add new page
            if (y > doc.internal.pageSize.getHeight() - 32) {
                doc.addPage();
                y = 32; // Reset y position
            }

            doc.setFontSize(14);
            doc = jspdfUtil.icon(info.icon, { x: 16, y }).getDoc();
            doc.setFont('Montserrat', 'medium');
            doc.text(this.myTranslateService.instant(info.label).toUpperCase(), 16 + 16 + 4, y - 2);
            doc.setFont('Montserrat', 'regular');
            doc = jspdfUtil.dynamicBorder(y, 16, 210 - 32, 0, this.myTranslateService.instant(info.label).toUpperCase()).getDoc();

            y += 24;

            let x: number = 16;
            info.items.forEach((item: IKeyValue | string, i: number) => {
                if (typeof item === 'string') {
                    doc.setFontSize(12);
                    if (i === 0) {
                        y += 4;
                    }

                    const dim: { w: number, h: number } = doc.getTextDimensions(item);
                    if (x + dim.w + 20 > 210 - 16) {
                        x = 16;
                        y += 24;
                    }

                    doc.setFillColor('#D9D9D9');
                    doc.roundedRect(x, y - 12, dim.w + 15, dim.h + 5, 4, 4, 'F');

                    doc.text(`${item}`, x + 8, y);
                    x+= dim.w + 20;

                    if (i === info.items.length - 1) {
                        y += 24;
                    }
                } else {
                    doc.setFontSize(12);
                    doc.setFont('Montserrat', 'medium');
                    doc.text(`${this.myTranslateService.instant(item.key)}:`, 16, y);
                    y += 16;
                    doc.setFont('Montserrat', 'regular');
                    if (item.value instanceof Array) {
                        doc = jspdfUtil.text(item.value, { x: 16, y }).getDoc();
                    } else {
                        doc.text(this.myTranslateService.instant(item.value), 16, y);
                    }
                    y += 20;
                }
            });

            // Spacing for next section
            y += 16;
        });

        y = 265;
        // Add journey section
        // Check if content exceeds page height, if so, add new page
        if (y > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage();
            y = 20; // Reset y position
        }

        profileData.timeline.forEach((entry: ICvJourney, i: number) => {
            if (entry.label) {
                doc.setFontSize(14);
                doc.setFont('Montserrat', 'medium');
                doc = jspdfUtil.icon(entry.icon, { x: 210 + 16, y }).getDoc();
                doc.text(`${this.myTranslateService.instant(entry.label).toUpperCase()}`, 210 + 16 + 16 + 4, y - 2);
                doc.setFont('Montserrat', 'regular');
                doc = jspdfUtil.dynamicBorder(y, 210 + 16, JspdfUtil.A4_WIDTH - 210 - 32, 210, this.myTranslateService.instant(entry.label).toUpperCase()).getDoc();
                doc.setFontSize(12);
                y += 20;
            }

            let dateText;
            if (!entry.endDate) {
                dateText = `${this.myTranslateService.instant('mosa.commons.since.label')} ${this.dateFormat(entry.startDate)}`;
            } else {
                dateText = `${this.dateFormat(entry.startDate, i >= profileData.timeline.length - 2 ? 'MM/yyyy' : undefined)} - ${this.dateFormat(entry.endDate, i >= profileData.timeline.length - 2 ? 'MM/yyyy' : undefined)}`;
            }

            doc.text(dateText, 210 + 16, y);
            entry.items.forEach((item) => {
                doc = jspdfUtil.text(`${this.myTranslateService.instant(item as string)}`, { x: -16, y }, undefined, { align: 'right' }).getDoc();
                y += 16;
            });

            if (profileData.timeline[ i + 1 ] && profileData.timeline[ i + 1 ].label) {
                y += 24;
            }
        });

        // Spacing for next section
        y += 16;

        profileData.extras.forEach((entry: ICvJourney, i: number) => {
            if (entry.label) {
                doc.setFontSize(14);
                doc.setFont('Montserrat', 'medium');
                doc = jspdfUtil.icon(entry.icon, { x: 210 + 16, y }).getDoc();
                doc.text(`${this.myTranslateService.instant(entry.label).toUpperCase()}`, 210 + 16 + 16 + 4, y - 2);
                doc.setFont('Montserrat', 'regular');
                doc = jspdfUtil.dynamicBorder(y, 210 + 16, JspdfUtil.A4_WIDTH - 210 - 32, 210, this.myTranslateService.instant(entry.label).toUpperCase()).getDoc();
                doc.setFontSize(12);
                y += 20;
            }

            // doc.text(entry.label, 210 + 16, y);
            entry.items.forEach((item: IKeyValue | string) => {
                if (typeof item === 'object') {
                    doc = jspdfUtil.text(`${this.myTranslateService.instant(item.key)}`, { x: 210 + 16, y }).getDoc();
                    if (item.value) {
                        doc = jspdfUtil.text(this.myTranslateService.instant(item.value as string), { x: -16, y }, undefined, { align: 'right' }).getDoc();
                    }
                }

                y += 16;
            });

            y += 24;
        });

        // Save the PDF
        doc.save('cv.pdf');
    }

    private dateFormat(date: string, format: string = 'yyyy'): string {
        return formatDate(date, format, this.myTranslateService.currentLang || this.myTranslateService.defaultLang);
    }
}
