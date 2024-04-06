import { IRating } from '../rating.model';

export interface IHomeState {
    isLoading: boolean;
    rating: IRating;
}
