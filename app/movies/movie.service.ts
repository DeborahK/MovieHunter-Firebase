import { Injectable } from '@angular/core';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    constructor(private af: AngularFire) { }

    getMovies() {
        return this.af.database.list('movies');
    }

    getMovie(id: number) {
        return this.af.database.object('movies/' + id);
    }

    saveMovie(movie: IMovie) {
        console.log(movie.movieId);
        // Have to always get the current data first?
        const item: FirebaseObjectObservable<IMovie> =
            this.af.database.object('movies/' + movie.movieId);
        return item.update({title: movie.title});
    }
}
