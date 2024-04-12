import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
]

const PRIMENG_MODULES = [
  ToastModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CoreModule,
    MainModule,
    AuthModule,
    ...PRIMENG_MODULES
  ],
  providers: [MessageService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
