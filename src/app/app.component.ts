import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';

interface Movie {
  backdrop: string;
  id: number;
  overview: string;
  poster: string;
  year: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies!: Movie[];
  moviesFiltered!: Movie[];
  search: string = '';

  constructor(
    private moviesService: MoviesService
  ) { }

  async ngOnInit() {
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
}
