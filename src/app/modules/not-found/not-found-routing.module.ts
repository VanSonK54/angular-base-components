import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutherizationGuard } from 'src/app/core/guards';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    canActivate: [AutherizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
