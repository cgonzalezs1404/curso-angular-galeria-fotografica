import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html'
})

export class AlbumsListComponent implements OnInit {

    public titulo: string = 'popo papa';
    public albums: Album[] = [];

    constructor(private albumService: AlbumService) {

    }

    async ngOnInit(): Promise<void> {
        console.log('saludoss');
        this.titulo = 'Listado de albums:';
        await this.getAlbums();
    }

    async getAlbums() {
        var result = await this.albumService.get().then((resp) => resp).catch((err) => err);
        if(result.status === 200){
            this.albums = result.body;
        }
        console.log(this.albums);
    }
}
