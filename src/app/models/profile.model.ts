import { IKeyValue } from './key-value.model';
import { ILink } from './link.model';

export interface IProfile {
    name: string;
    branch: string;
    cvInfo: ICvInfo[];
    socialMedia: ILink[];
    downloads: ILink[];
    journey: ICvJourney[];
}

export interface ICvJourney {
    title: string;
    icon: string;
    startDate: string;
    endDate?: string;
    list: string[];
}

export interface ICvInfo {
    label: string;
    icon: string;
    items: (IKeyValue | string)[];
}
