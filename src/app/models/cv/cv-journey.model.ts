import { ICvInfo } from './cv-info.model';

export interface ICvJourney extends ICvInfo {
    startDate?: string;
    endDate?: string;
}
