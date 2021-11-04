import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { RxjsComponent } from '../../pages/rxjs/rxjs.component';
import { PromesasComponent } from '../../pages/promesas/promesas.component';
import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { ShopComponent } from '../../pages/shop/shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CartdetalleComponent } from '../../pages/cartdetalle/cartdetalle.component';
import { MediosdepagoyenvioComponent } from '../../pages/mediosdepagoyenvio/mediosdepagoyenvio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreguntasfrecuentesComponent } from '../../pages/preguntasfrecuentes/preguntasfrecuentes.component';
import { NosotrosComponent } from '../../pages/nosotros/nosotros.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { EventsComponent } from '../../pages/events/events.component';
import { HowtobuyComponent } from '../../pages/HowToBuy/HowToBuy.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { ProductoidComponent } from '../../pages/productoid/productoid.component';
import { EnviosComponent } from '../../pages/envios/envios.component';
import { AutorComponent } from '../../pages/autor/autor.component';
import { EditorialComponent } from '../../pages/editorial/editorial.component';
import { CategoriasComponent } from '../../pages/categorias/categorias.component';
import { SubcatComponent } from '../../pages/subcat/subcat.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyLoaderComponent } from '../../components/my-loader/my-loader.component';
import { PerfilComponent } from '../../pages/perfil/perfil.component';
import { ForgotpassComponent } from '../../pages/forgotpass/forgotpass.component';
import { ForgotpasscodigoComponent } from 'src/app/pages/forgotpasscodigo/forgotpasscodigo.component';
import { ResetpassComponent } from 'src/app/pages/resetpass/resetpass.component';










@NgModule({
  declarations: [
    DefaultComponent,
    RxjsComponent,
    PromesasComponent,
    HomepageComponent,
    ShopComponent,
    CartdetalleComponent,
    MediosdepagoyenvioComponent,
    PreguntasfrecuentesComponent,
    NosotrosComponent,
    ProductsComponent,
    EventsComponent,
    HowtobuyComponent,
    ProductoidComponent,
    EnviosComponent,
    AutorComponent,
    EditorialComponent,
    CategoriasComponent,
    SubcatComponent,
    PerfilComponent,
    ForgotpassComponent,
    ForgotpasscodigoComponent,
    ResetpassComponent,





    
  



  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    AngularMaterialModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    FontAwesomeModule,
    MatProgressBarModule,
    NgxSpinnerModule ,
  ],
  exports: [
    
  ],
  providers:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class DefaultModule { }
