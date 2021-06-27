import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: any;
  genres: any;

  constructor(
    private moviesService: MoviesService
  ) { }

  async ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    this.movies = await this.moviesService.getMovies();
  }
}
