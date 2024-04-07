import { ILink } from '../link.model';
import { IProfile } from './profile.model';

export interface IWebProfile extends IProfile {
    socialMedia: ILink[];
    downloads: ILink[];
}
