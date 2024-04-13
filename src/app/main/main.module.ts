import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mainGuard } from '../core/_guards/main.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [mainGuard],
    children: [
      { path: 'movies', component: MovieListComponent },
      { path: '', pathMatch: 'full', redirectTo: 'movies' }
    ]

  }
]

const COMPONENTS = [
  MainComponent,
  MovieListComponent,
  MovieDetailsComponent,
  MovieFormComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
