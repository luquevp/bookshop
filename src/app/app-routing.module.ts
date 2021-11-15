import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, CanActivate } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartdetalleComponent } from './pages/cartdetalle/cartdetalle.component';
import { MediosdepagoyenvioComponent } from './pages/mediosdepagoyenvio/mediosdepagoyenvio.component';
import { PreguntasfrecuentesComponent } from './pages/preguntasfrecuentes/preguntasfrecuentes.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductsComponent } from './pages/products/products.component';
import { EventsComponent } from './pages/events/events.component';
import { HowtobuyComponent } from './pages/HowToBuy/HowToBuy.component';
import { ProductoidComponent } from './pages/productoid/productoid.component';
import { BusquedasService } from './services/busquedas.service';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';
import { EnviosComponent } from './pages/envios/envios.component';
import { AutorComponent } from './pages/autor/autor.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { SubcatComponent } from './pages/subcat/subcat.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { ForgotpasscodigoComponent } from './pages/forgotpasscodigo/forgotpasscodigo.component';
import { ResetpassComponent } from './pages/resetpass/resetpass.component';
import { PerfileditarComponent } from './pages/perfileditar/perfileditar.component';


const routes: Routes = [

  {
    path: '', component: DefaultComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'carrito', component: CartdetalleComponent,    
    },
      { path: 'mediosdepago', component: MediosdepagoyenvioComponent, },
      { path: 'envios', component: EnviosComponent, },

      { path: 'preguntasfrecuentes', component: PreguntasfrecuentesComponent, },
      { path: 'nosotros', component: NosotrosComponent, },
      { path: 'eventos', component: EventsComponent, },
      { path: 'comocomprar', component: HowtobuyComponent, },
      { path: 'libros/:id', component: ProductoidComponent, },
      { path: 'buscar/libros/:termino', component: ProductsComponent, },
      { path: 'autores/:termino', component: AutorComponent, },
      { path: 'editoriales/:termino', component: EditorialComponent, },
      { path: 'categorias/:termino', component: CategoriasComponent, },
      { path: 'subcategorias/:termino', component: SubcatComponent, },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'perfil', component: PerfilComponent, },
      { path: 'olvidemicontraseña', component: ForgotpassComponent },
      { path: 'olvidemicontraseña/codigo', component: ForgotpasscodigoComponent },
      { path: 'restaurarcontraseña', component: ResetpassComponent,  },
      { path: 'perfil/editar', component: PerfileditarComponent, },



















    ],
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
