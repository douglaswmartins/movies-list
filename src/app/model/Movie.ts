import { Genre } from "./Genre";

export interface Movie {
  id?: number
  year: string
  title: string
  poster: string
  genres: Genre[]
  director: string
  overview: string
}