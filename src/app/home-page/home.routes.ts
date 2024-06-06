import { Routes } from '@angular/router';
import {ClientsPageComponent} from "../clients/page/clients-page.component";
import {HomePageComponent} from "./page/home-page.component";
import {ChatComponent} from "../chat/components/chat/chat.component";
import {ProductPageComponent} from "../products/page/product-page.component";
import {RootCategoryPageComponent} from "../root-category/page/root-category.page.component";
import {UserPageComponent} from "../user/page/user.page.component";

export const homeRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    children: [
      {
        path: "",
        redirectTo: "clients",
        pathMatch: "full",
      },
      {
        title: "Clientes",
        component: ClientsPageComponent,
        path: 'clients',
        pathMatch: "full"
      },
      {
        title: "Chat Relatório",
        component: ChatComponent,
        path: 'chat',
        pathMatch: "full"
      },
      {
        title: "Produtos",
        component: ProductPageComponent,
        path: 'products',
        pathMatch: "full"
      },
      {
        title: "Categorias",
        component: RootCategoryPageComponent,
        path: 'root-categories',
        pathMatch: "full"
      },
      {
        title: "Usuarios - convites",
        component: UserPageComponent,
        path: 'users',
        pathMatch: "full"
      }
    ]
  },
];
