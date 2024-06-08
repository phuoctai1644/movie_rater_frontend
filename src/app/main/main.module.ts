/** Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';

/** NgRx Store + Effect */
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from '../core/_stores/auth';
import { EffectsModule } from '@ngrx/effects';
import * as authEffects from '../core/_stores/auth/auth.effects';

/** Components */
import { MainComponent } from './main.component';
import { MovieItemComponent } from './_components/movie-item/movie-item.component';
import { MovieListComponent } from './_components/movie-list/movie-list.component';
import { MovieDetailComponent } from './_components/movie-detail/movie-detail.component';

/** Pipes */
import { EmbedUrlPipe } from './_pipes/embed-url.pipe';
import { AvgRatingPipe } from './_pipes/avg-rating.pipe';

/** Others */
import { mainGuard } from '../core/_guards/main.guard';
import { MyProfileComponent } from './_components/my-profile/my-profile.component';
import { authGuard } from '../core/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard, mainGuard],
    children: [
      { path: 'movies/:id', component: MovieDetailComponent },
      { path: 'movies', component: MovieListComponent },
      { path: 'profile', component: MyProfileComponent },
      { path: '', pathMatch: 'full', redirectTo: 'movies' }
    ]
  }
]

const COMPONENTS = [
  MainComponent,
  MovieItemComponent,
  MovieListComponent,
  MovieDetailComponent,
  MyProfileComponent,
]

const PIPES = [
  EmbedUrlPipe,
  AvgRatingPipe,
]

const PIRMENG_MODULES = [
  InputTextModule,
  ButtonModule,
  TooltipModule,
  ProgressBarModule,
  ToastModule,
  DialogModule,
  InputTextareaModule,
  OverlayPanelModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature(authEffects),
    ...PIRMENG_MODULES,
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
