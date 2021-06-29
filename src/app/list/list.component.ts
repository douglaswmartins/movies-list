import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../model/Movie';
import { MoviesService } from '../movies.service';

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
    this.movies = await this.moviesService.getMovies();
    this.moviesFiltered = this.movies;
  }

  handleSearch() {
    const search = this.search.toLowerCase().trim();

    this.moviesFiltered = this.movies.filter((movie: any) => {
      const title = movie.title.toLowerCase().trim();
      return title.includes(search);
    });
  }

  handleNewMovie() {
    this.router.navigate(['cadastro']);
  }
  
}
