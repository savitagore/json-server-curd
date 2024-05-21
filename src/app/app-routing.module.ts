import { AddUserComponent } from './compoents/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './compoents/list-user/list-user.component';

const routes: Routes = [
  {
    path: "",
    component: ListUserComponent
  },
  {
    path: "list",
    component: ListUserComponent
  },
  {


    path: "addUser",
    component: AddUserComponent

  },
  {
    path: "addUser/:id",
    component: AddUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
