import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector:'my-app',
    templateUrl: './app/app.html'
})

export class AppComponent implements OnInit {
    title = 'Tour of Heroes';

    constructor(private _router: Router, private segment:RouteSegment) {
    }

    ngOnInit() {
        console.log('current route name', this._router.url);
    }
}