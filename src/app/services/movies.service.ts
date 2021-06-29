import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Movie } from '../model/Movie';
import { Genre } from '../model/Genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private BACKEND_URL = environment.BACKEND_URL;

  constructor(
    private http: HttpClient
  ) { }

  async getMovies() {
    return await this.http.get<Movie[]>(`${this.BACKEND_URL}movies`).toPromise();
  }

  async postMovie(obj: Movie) {
    return await this.http.post(`${this.BACKEND_URL}movies`, obj).toPromise();
  }

  async deleteMovie(id: number) {
    return await this.http.delete(`${this.BACKEND_URL}movies/${id}`).toPromise();
  }
  
  async getGenres() {
    return await this.http.get<Genre[]>(`${this.BACKEND_URL}genres`).toPromise();
  }
}
