import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: "login"
  },
  
  
  { path: '', redirectTo: 'login', pathMatch: "full" },
  
  {
    path: '', component: DashboardComponent, children: [
      { path:'dashboard', loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
