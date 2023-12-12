import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent }
  , { path: '**', component: AlbumsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
