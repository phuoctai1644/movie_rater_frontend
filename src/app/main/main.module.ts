/** Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

/** Components */
import { MainComponent } from './main.component';
import { MovieItemComponent } from './_components/movie-item/movie-item.component';
import { MovieListComponent } from './_components/movie-list/movie-list.component';

/** Others */
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
  MovieItemComponent,
  MovieListComponent
]

const PIRMENG_MODULES = [
  InputTextModule,
  ButtonModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(routes),
    ...PIRMENG_MODULES,
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
