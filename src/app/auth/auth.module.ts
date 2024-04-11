import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './_components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'auth', redirectTo: 'auth/sign-in' },
  { path: 'auth/sign-in', component: SignInComponent }
]

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
