import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    title: "Entrar",
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    path: 'login'
  },
  {
    title: "Registrar-se",
    loadComponent: () => import('./singup/singup.component').then(m => m.SingupComponent),
    path: 'signup/:uuid'
  },
  {
    path: "home-page",
    loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule),
    title: "Inicio",
  },
  {
    title: "PAGINA NÃO ENCONTRADA",
    path: "**",
    pathMatch: "full",
    loadComponent: () => import('./@shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

];
