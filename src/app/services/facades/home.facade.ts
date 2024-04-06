import { IHomeState } from '../../models/states/home.state';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRating } from '../../models/rating.model';

let _state: IHomeState = {
    isLoading: false,
    rating: null,
};

@Injectable({
    providedIn: 'root',
})
export class HomeFacade {

    protected readonly store$: BehaviorSubject<IHomeState> = new BehaviorSubject<IHomeState>(_state);

    constructor(
        private readonly myHttpClient: HttpClient,
    ) {
    }

    public get snapshot(): IHomeState {
        return this.store$.value;
    }

    public subState(): Observable<IHomeState> {
        return this.store$.asObservable();
    }

    public async addRating(rating: number): Promise<void> {
        await firstValueFrom(this.myHttpClient.post('./api/ratings/rating.php', { rating }));
    }

    public async loadRating(): Promise<IRating> {
        const rating: IRating = await firstValueFrom(this.myHttpClient.get<IRating>('./api/ratings/rating.php'));
        this.updateState({ ..._state, rating });
        return rating;
    }

    private updateState(state: Partial<IHomeState>): void {
        this.store$.next({ ...this.snapshot, ...state });
    }

}
