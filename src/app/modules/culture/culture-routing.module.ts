import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CultureListComponent } from './components/culture-list/culture-list.component';

const routes: Routes = [
      {
        path: 'list',
        component: CultureListComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
