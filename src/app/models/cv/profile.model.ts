import { ICvInfo } from './cv-info.model';
import { ICvJourney } from './cv-journey.model';

export interface IProfile {
    firstName: string;
    lastName: string;
    branch: string;
    imageUrl: string;
    cvInfo: ICvInfo[];
    timeline: ICvJourney[];
}
