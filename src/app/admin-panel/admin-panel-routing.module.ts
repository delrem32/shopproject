import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminEditComponent} from './admin-edit/admin-edit.component';
import {AdminCreateComponent} from './admin-create/admin-create.component';


const routes: Routes = [
  {path: '', component: AdminHomeComponent},
  {path: 'edit', component: AdminEditComponent},
  {path: 'edit/:_id', component: AdminEditComponent},
  {path: 'create', component: AdminCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
