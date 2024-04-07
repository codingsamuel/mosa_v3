import { MaterialSymbol } from 'material-symbols';
import { IKeyValue } from '../key-value.model';

export interface ICvInfo {
    label: string;
    icon: MaterialSymbol | string;
    items: (IKeyValue | string)[];
}
