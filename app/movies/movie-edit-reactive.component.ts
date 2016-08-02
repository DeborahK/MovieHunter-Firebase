import { Component, OnInit, OnDestroy } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import { NumberValidators } from '../shared/number.validator';

@Component({
    templateUrl: 'app/movies/movie-edit-reactive.component.html',
    directives: [ROUTER_DIRECTIVES,
                REACTIVE_FORM_DIRECTIVES]
})
export class MovieEditReactiveComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Edit Movie';
    editForm: FormGroup;
    formError: { [id: string]: string };
    private validationMessages: { [id: string]: { [id: string]: string } };
    movie: IMovie;
    errorMessage: string;
    private _subscriber: any;

    constructor(private fb: FormBuilder,
                private movieService: MovieService,
                private router: Router,
                private route: ActivatedRoute) {

        // Initialize strings
        this.formError = {
            'title': '',
            'director': '',
            'starRating': '',
            'description': ''
        };

        this.validationMessages = {
            'title': {
                'required': 'Movie title is required',
                'minlength': 'Movie title must be at least three characters.',
                'maxlength': 'Movie title cannot exceed 50 characters.'
            },
            'director': {
                'required': 'Director is required',
                'minlength': 'Director must be at least 5 characters.',
                'maxlength': 'Director cannot exceed 50 characters.'
            },
            'starRating': {
                'range': 'Rate the movie between 1 (lowest) and 5 (highest).'
            }
        };
    }

    ngOnInit(): void {
        this._subscriber = this.route.params.subscribe(
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
        this.movieService.getMovie(id)
            .subscribe(
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error);
    }

    onMovieRetrieved(movie: IMovie) {
        this.movie = movie;

        if (this.movie.movieId === 0) {
            this.pageTitle = 'Add Movie (Reactive)';
        } else {
            this.pageTitle = `Edit Movie (Reactive): ${this.movie.title}`;
        }

        this.editForm = this.fb.group({
            'title': [this.movie.title,
                    [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)]],
            'director': [this.movie.director,
                    [Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)]],
            'starRating': [this.movie.starRating,
                NumberValidators.range(1, 5)],
            'description': [this.movie.description]
        });

        this.editForm.valueChanges
            .map(value => {
                // Causes infinite loop
                // this.titleControl.updateValue(value.title.toUpperCase());
                value.title = value.title.toUpperCase();
                //console.log(value.title);
                return value;
            })
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any) {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.editForm.controls[field].dirty &&
                    !this.editForm.controls[field].valid;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.editForm.controls[field].errors) {
                        if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                            this.formError[field] += this.validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }

    saveMovie() {
         console.log(this.editForm);
         if (this.editForm.dirty && this.editForm.valid) {
            const updatedMovie = this.editForm.value;
            updatedMovie.movieId = this.movie.movieId;
            this.movieService.saveMovie(updatedMovie);
            alert(`Movie: ${JSON.stringify(this.editForm.value)}`);
        }
    }
}
