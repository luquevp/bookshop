import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';

import { NopagefoundComponent } from './modules/nopagefound/nopagefound.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from './components/components.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
 
import { ToastrModule } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AutorComponent } from './pages/autor/autor.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { NotyfToast } from './notyf.toast';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    LoginComponent,
    RegisterComponent,
    NotyfToast



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    
    ComponentsModule,
    NgbModule,
    NgbPaginationModule,
    CommonModule,
    ToastrModule.forRoot({
      toastComponent:NotyfToast,
      timeOut: 1700,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates:true,
      resetTimeoutOnDuplicate:true,
      progressBar: true,
      includeTitleDuplicates:true,

      
    }), // ToastrModule added
    MatProgressBarModule
    



  ],
  entryComponents: [ NotyfToast],
  providers: [


  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
