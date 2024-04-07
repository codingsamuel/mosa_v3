import { IProfile } from './profile.model';
import { ICvInfo } from './cv-info.model';

export interface ICvProfile extends IProfile {
    extras: ICvInfo[];
}
