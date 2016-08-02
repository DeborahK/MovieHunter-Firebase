import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    private _moviesUrl = 'app/movies/movies.json';

    constructor(private af: AngularFire) { }

    //constructor(private _http: Http) { }

    getMovies() {
        return this.af.database.list('movies')
            .do(data => console.log('getMovies: ' + data))
            .catch(this.handleError);
    }

    getMovie(id: number) {
        return this.af.database.object('movies/' + id);
    }

    saveMovie(movie: IMovie) {
        console.log(movie.movieId);
        // Have to always get the current data first?
        const item: FirebaseObjectObservable<IMovie> = 
            this.af.database.object('movies/' + movie.movieId);
        return item.update({title:movie.title});
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
