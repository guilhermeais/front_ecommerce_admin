import { Routes } from '@angular/router';
import {HomePageComponent} from "./page/home-page.component";
import {ChatComponent} from "../chat/components/chat/chat.component";
import {ProductPageComponent} from "../products/page/product-page.component";
import {RootCategoryPageComponent} from "../root-category/page/root-category.page.component";
import {UserPageComponent} from "../user/page/user.page.component";
import { SalesComponent } from '../sales/page/sales.component';

export const homeRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    children: [
      {
        path: "",
        redirectTo: "sales",
        pathMatch: "full",
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
      },
      {
        title: "Vendas",
        path: 'sales',
        component: SalesComponent,
      }
    ]
  },
];
