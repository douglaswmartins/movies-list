import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private BACKEND_URL = environment.BACKEND_URL;

  constructor(
    private http: HttpClient
  ) { }

  async getMovies() {
    return await this.http.get<any>(`${this.BACKEND_URL}movies`).toPromise();
  }

  async getGenres() {
    return await this.http.get<any>(`${this.BACKEND_URL}genres`).toPromise();
  }
}
