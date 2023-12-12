import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html'
})

export class AlbumDetailComponent implements OnInit {

    public titulo: string = '';
    public album: Album|any;
    public loading: boolean = false;

    constructor(private albumService: AlbumService, private router: Router, private route: ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        this.titulo = 'Detalle de album:';
        await this.getAlbum();
    }

    async getAlbum() {
        this.loading = true;
        this.route.params.forEach(async (params: Params) => {
            let id = params['id'];
            var result = await this.albumService.get(id).then((resp) => resp).catch((err) => err);
            if (result.status === 200) {
                this.album = result.body;
                if(!this.album){
                    this.router.navigate(['/']);
                }
                this.loading = false;
            }
        });

    }
}
