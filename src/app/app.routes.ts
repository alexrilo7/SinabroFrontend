import { Routes } from '@angular/router';
import { EquipoComponent } from './equipo/component/equipo.component';
import { JugadorComponent } from './jugador/component/jugador.component';
import { HomePageComponent } from './login/component/home-page.component';
import { RankingComponent } from './ranking/ranking/ranking.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'equipos', component: EquipoComponent},
    { path: 'jugadores', component: JugadorComponent},
    { path: 'ranking', component: RankingComponent},
    { path: 'home', component: HomeComponent}
    
];
