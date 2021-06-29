import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/Movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  movies!: Movie[];
  moviesFiltered!: Movie[];
  search: string = '';

  constructor(
    private router: Router,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    this.movies = (await this.moviesService.getMovies()).reverse();
    this.moviesFiltered = this.movies;
  }

  searchMovie() {
    const search = this.search.toLowerCase().trim();

    this.moviesFiltered = this.movies.filter((movie: any) => {
      const title = movie.title.toLowerCase().trim();
      return title.includes(search);
    });
  }

  handleNewMovie() {
    this.router.navigate(['cadastro']);
  }

  async removeMovie(movie: Movie) {
    console.log(movie);
    
    if (movie.id) {
      await this.moviesService.deleteMovie(movie.id);
      this.removeMovieFromArray(movie.id);
    }
  }

  removeMovieFromArray(id: number) {
    const i = this.movies.findIndex(e => e.id === id);
    const iFiltered = this.moviesFiltered.findIndex(e => e.id === id);

    this.movies.splice(i, 1);
    this.searchMovie();
  }
  
}
