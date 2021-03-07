import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgProgressModule } from 'ngx-progressbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor, ProgressBarInterceptor } from './core/interceptors';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { translateConfig } from './shared/configs/ngx-translate.config';
import { ValidationMessageModule } from './shared/modules';

export function refreshTokenInitializerFactory(authService: AuthenticationService) {
  return () => { 
    return authService.initTokenExpireTimeManagement();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot(translateConfig),
    NgProgressModule.withConfig({
      color: 'red',
      spinner: false,
    })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: refreshTokenInitializerFactory, deps: [AuthenticationService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
