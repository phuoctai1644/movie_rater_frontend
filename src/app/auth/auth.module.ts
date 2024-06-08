import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './_components/sign-in/sign-in.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './_components/sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from '../core/_stores/auth';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  }
]

const PRIMENG_MODULES = [
  InputTextModule,
  ButtonModule,
]

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(authFeatureKey, authReducer),
    ...PRIMENG_MODULES
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
