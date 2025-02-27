
import { Routes } from "@angular/router";
import { authRoutes } from "./auth/ui/auth.routes";
import { MainpageComponent } from "./main/ui/pages/mainpage/mainpage.component";
import { loggedGuard } from "./shared/guards/logged.guard";

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },  // Redirección a /auth/registro por defecto
    { path: 'auth', children: authRoutes },  // Utilizando las rutas definidas en authRoutes
    { path: 'main', component: MainpageComponent, canActivate: [loggedGuard] }
];