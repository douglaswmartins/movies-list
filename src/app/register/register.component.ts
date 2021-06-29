import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Genre } from '../model/Genre';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  movieForm = new FormGroup({});
  image: string|null = null;
  genres!: Genre[];
  genresSelected: Genre[] = [];
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.getGenres();
    this.buildFormMovie();
  }

  async getGenres() {
    this.genres = await this.moviesService.getGenres();
  }

  buildFormMovie() {
    this.movieForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.required),
      director: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      overview: new FormControl(null, Validators.required),
      poster: new FormControl(null, Validators.required),
      genres: new FormArray([], Validators.required)
    });
  }

  uploadImage(event: any) {
    const reader = new FileReader();
    
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.image = reader.result as string;
          this.movieForm.patchValue({
            poster: reader.result
          });
        };

    }
  }

  returnToList() {
    this.router.navigate(['']);
  }

  handleCheckGenres(event: any) {
    const value = event.target.value;
    let genresCtrl = this.movieForm.get('genres') as FormArray;
    
    if (!genresCtrl.value.includes(value)) {
      return genresCtrl.push(new FormControl(value));
    } 

    const index = genresCtrl.value.indexOf(value);
    genresCtrl.removeAt(index);    
  }

  async onSubmit() {
    if (this.movieForm.invalid) {
      return;
    }
    this.loading = true;

    this.movieForm.patchValue({
      id: Math.floor(100000 + Math.random() * 900000)
    });

    await this.moviesService.postMovie(this.movieForm.value);
    this.returnToList();
    this.loading = false;
  }


}
