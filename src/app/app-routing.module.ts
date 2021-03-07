import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutherizationGuard } from './core/guards';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AutherizationGuard],
    children: [
      {
        path: 'culture',
        loadChildren: () => import('./modules/culture/culture.module').then(m => m.CultureModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./modules/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'product-template',
        loadChildren: () => import('./modules/product-template/product-template.module').then(m => m.ProductTemplateModule)
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('../app/modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
