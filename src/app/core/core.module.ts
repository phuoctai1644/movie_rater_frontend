import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptorProvider } from './config/interceptor.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    TokenInterceptorProvider
  ]
})
export class CoreModule { }
