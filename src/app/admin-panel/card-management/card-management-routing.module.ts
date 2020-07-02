import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardCreateComponent } from './card-create/card-create.component';


const routes: Routes = [
  {path: '', component: CardListComponent, pathMatch: 'full'},
  {path: 'edit', component: CardEditComponent},
  {path: 'edit/:_id', component: CardEditComponent},
  {path: 'create', component: CardCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardManagementRoutingModule { }
