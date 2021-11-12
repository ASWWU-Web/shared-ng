import { Injectable } from '@angular/core';

// Refrence: https://zoaibkhan.com/blog/how-to-add-loading-spinner-in-angular-with-rxjs/
//           https://github.com/ASWWU-Web/frontend/issues/38
//           https://github.com/Microsoft/vscode/issues/45071

@Injectable({
    providedIn: 'root'
})

export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    constructor () { }

    show() {
        this._loading.next(true);
    }

    hide() {
        this._loading.next(false);
    }
}
