import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { ImageAddComponent } from './components/image-add.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'crear-album', component: AlbumAddComponent },
  { path: 'editar-album/:id', component: AlbumEditComponent },
  { path: 'crear-imagen/:album', component: ImageAddComponent },
  { path: '**', component: AlbumsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
