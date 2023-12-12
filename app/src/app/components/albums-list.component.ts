import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html'
})

export class AlbumsListComponent implements OnInit {

    public titulo: string = '';
    public albums: any[] = [];
    public loading: boolean = false;
    public confirmado = '';

    constructor(private albumService: AlbumService) {

    }

    async ngOnInit(): Promise<void> {
        this.titulo = 'Listado de albums:';
        await this.getAlbums();
    }

    async getAlbums() {
        this.loading = true;
        var result = await this.albumService.getAll().then((resp) => resp).catch((err) => err);
        if (result.status === 200) {
            this.albums = result.body;
            this.loading = false;
        }
    }

    onDeleteConfirm(id: string) {
        this.confirmado = id;
    }

    async onDeleteAlbum(id: string) {
        var result = await this.albumService.delete(id).then((res) => res).catch((err) => err);
        if(result.status === 200){
            await this.getAlbums();
        }
    }

    onCancelAlbum() {
        this.confirmado = '';
    }
}
