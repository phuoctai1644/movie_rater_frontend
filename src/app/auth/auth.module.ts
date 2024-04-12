import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './_components/sign-in/sign-in.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'auth', redirectTo: 'auth/sign-in' },
  { path: 'auth/sign-in', component: SignInComponent }
]

const PRIMENG_MODULES = [
  InputTextModule,
  ButtonModule,
]

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ...PRIMENG_MODULES
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
