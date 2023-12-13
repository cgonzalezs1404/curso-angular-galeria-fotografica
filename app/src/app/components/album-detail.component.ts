import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html'
})

export class AlbumDetailComponent implements OnInit {

    public titulo: string = '';
    public loading: boolean = false;
    public album: any;
    public images: any[] = [];

    constructor(private albumService: AlbumService, public imageService: ImageService, private router: Router, private route: ActivatedRoute) {

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
            if (result.status !== 200) {
                return;
            }

            this.album = result.body;
            if (!this.album) {
                this.router.navigate(['/']);
            }

            var result = await this.imageService.getAll(this.album._id);
            if (result.status !== 200) {
                return;
            }
            this.images = result.body;
            console.log(this.images);
            this.loading = false;
        });

    }
}
