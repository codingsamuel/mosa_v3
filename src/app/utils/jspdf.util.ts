import jsPDF, { Font, TextOptionsLight } from 'jspdf';
import { ISize } from '../models/jspdf/size.model';
import { IPosition } from '../models/jspdf/position.model';
import { ILink } from '../models/link.model';
import { MaterialSymbol } from 'material-symbols';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export class JspdfUtil {

    public static readonly A4_WIDTH = 595.28;
    public static readonly A4_HEIGHT = 841.89;

    private readonly images: ILink[] = [];

    constructor(
        private readonly doc: jsPDF,
        private readonly myTranslateService: TranslateService,
    ) {
    }

    public addFonts(fontName: string, folder: string, fontFiles: string[]): JspdfUtil {
        for (const file of fontFiles) {
            const convertedName: string = file.split('-').pop().replace('.ttf', '').replace('.woff2', '').toLowerCase();
            this.doc.addFont(`${folder}/${file}`, fontName, convertedName);
        }
        return this;
    }

    public addImages(images: ILink[]): JspdfUtil {
        this.images.push(...images);
        return this;
    }

    public text(text: string | string[], position: IPosition, size?: ISize, options?: TextOptionsLight): JspdfUtil {
        const actualPosition: IPosition = this.calculatePosition(position, size);

        if (!Array.isArray(text)) {
            text = [ text ];
        }

        text = text.map((t: string) => {
            if (!t.includes('date:')) {
                return t;
            }
            const date: Date = new Date(t.split(':')[ 1 ]);
            return formatDate(date, 'dd.MM.yyyy', this.myTranslateService.currentLang || this.myTranslateService.defaultLang);
        });

        this.doc.text((text as string[]).join(' / '), actualPosition.x, actualPosition.y, options);
        return this;
    }

    public image(image: MaterialSymbol | string, position: IPosition, size: ISize): JspdfUtil {
        const img: HTMLImageElement = new Image();
        img.src = this.images.find((l: ILink) => l.name === image)?.url;

        const actualPosition: IPosition = this.calculatePosition(position, size);
        this.doc.addImage(img, 'PNG', actualPosition.x, actualPosition.y, size.width, size.height);
        return this;
    }

    public icon(icon: MaterialSymbol | string, position: IPosition, size?: ISize): JspdfUtil {
        const actualPosition: IPosition = this.calculatePosition(position, size);
        const currentFont: Font = this.doc.getFont();
        this.doc.setFont('MaterialSymbols', 'outlined');
        this.doc.text(icon, actualPosition.x, actualPosition.y);
        this.doc.setFont(currentFont.fontName, currentFont.fontStyle);
        return this;
    }

    public dynamicBorder(y: number, x: number, width: number, offset: number, text: string): JspdfUtil {
        const dim: { w: number, h: number } = this.doc.getTextDimensions(text);
        this.doc.setFillColor('#350c30');

        // Thick border
        this.doc.rect(x, y + 3, dim.w + 16 + 12, 2, 'F');

        // Thin border
        this.doc.rect(offset + dim.w + 16 + 12 + 16, y + 4, width - dim.w - 16 - 12, 0.5, 'F');

        return this;
    }

    public getDoc(): jsPDF {
        return this.doc;
    }

    private calculatePosition(position: IPosition, size?: ISize): IPosition {
        const actualPosition: IPosition = { x: 0, y: 0 };

        if (position.x < 0) {
            actualPosition.x = JspdfUtil.A4_WIDTH + position.x - (size?.width || 0);
        } else {
            actualPosition.x = position.x;
        }

        if (position.y < 0) {
            actualPosition.y = JspdfUtil.A4_HEIGHT + position.y - (size?.height || 0);
        } else {
            actualPosition.y = position.y;
        }

        return actualPosition;
    }

}
