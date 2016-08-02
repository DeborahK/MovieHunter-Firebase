import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { MovieService } from './movies/movie.service';
import { IMovie } from './movies/movie';

@Component({
    selector: 'mh-app',
    template: `
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand">{{pageTitle}}</a>
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/movies']">Movie List</a></li>
                    <li><a [routerLink]="['/movieEdit', 0]">Add Movie</a></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        <pre>
            {{ movie | async | json }}
        </pre>
        <div>
            All
            <ul>
                <li *ngFor="let m of movies | async">{{m.title}}</li>
            </ul>
        </div>
        <div>
            Filtered
            <ul>
                <li *ngFor="let m of moviesFiltered | async">{{m.title}}</li>
            </ul>
        </div>     </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        MovieService
    ]
})
export class AppComponent {
    pageTitle: string = 'InStep Movie Hunter';

    movie: FirebaseObjectObservable<IMovie>;
    movies: FirebaseListObservable<IMovie[]>;
    moviesFiltered: Observable<IMovie[]>;

    constructor(af: AngularFire) {
        // af.database.list('movies').subscribe(movies => console.log(movies));
        // af.database.object('movies/2').subscribe(movie => console.log(JSON.stringify(movie)));
        this.movie = af.database.object('movies/2');
        this.movies = af.database.list('movies');

        this.moviesFiltered = this.movies
            .do(items => console.log(items))
            .map(items => items.filter(item => item.title.startsWith('The')));
    }
}
