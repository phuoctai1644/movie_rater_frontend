/** Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

/** Components */
import { MainComponent } from './main.component';
import { MovieItemComponent } from './_components/movie-item/movie-item.component';
import { MovieListComponent } from './_components/movie-list/movie-list.component';
import { MovieDetailComponent } from './_components/movie-detail/movie-detail.component';

/** Others */
import { mainGuard } from '../core/_guards/main.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [mainGuard],
    children: [
      { path: 'movies/:id', component: MovieDetailComponent },
      { path: 'movies', component: MovieListComponent },
      { path: '', pathMatch: 'full', redirectTo: 'movies' }
    ]
  }
]

const COMPONENTS = [
  MainComponent,
  MovieItemComponent,
  MovieListComponent,
  MovieDetailComponent,
]

const PIRMENG_MODULES = [
  InputTextModule,
  ButtonModule,
  TooltipModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ...PIRMENG_MODULES,
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
