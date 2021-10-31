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

import { NotyfToast } from './notyf.toast';
import { SubcatComponent } from './pages/subcat/subcat.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { InterceptorService } from './interceptors/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    LoginComponent,
    RegisterComponent,
    NotyfToast,
    MyLoaderComponent,
    
    
    
    



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
    MatProgressBarModule,
    NgxSpinnerModule
    



  ],
  entryComponents: [ NotyfToast],
  // providers: [

  //   LoaderService,
  //   { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  // ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
