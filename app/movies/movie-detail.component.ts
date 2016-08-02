import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/movies/movie-detail.component.html',
    styleUrls: ['app/movies/movie-detail.component.css'],
    directives: [ROUTER_DIRECTIVES, StarComponent]
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Movie Detail';
    movie: IMovie;
    errorMessage: string;
    private _subscriber: any;

    constructor(private _movieService: MovieService,
                private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._subscriber = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getMovie(id);
            }
        );
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

    getMovie(id: number) {
        this._movieService.getMovie(id)
            .subscribe(
                (movie: IMovie) => this.movie = movie,
                (error: any) => this.errorMessage = <any>error);
    }

    onBack() {
        this._router.navigate(['/movies']);
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}
