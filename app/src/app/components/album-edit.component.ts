import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-edit.html'
})

export class AlbumEditComponent implements OnInit {

    public titulo: string = '';
    public albums: Album[] = [];
    public loading: boolean = false;
    public submitted: boolean = false;
    public form: FormGroup | any;
    public id: string = '';

    constructor(private albumService: AlbumService, public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.titulo = 'Modificar Album';
    }

    public async ngOnInit(): Promise<void> {

        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required]
        });

        this.route.params.forEach(async (params: Params) => {
            this.id = params['id'];
        });

        var album = await this.albumService.get(this.id).then((res) => res).catch((err) => err);
        if(album.status !== 200){
            this.router.navigate(['/']);
        }
        this.form.patchValue(album.body);

    }

    public async btnAction(): Promise<void> {
        this.submitted = true;
        if (!this.form.invalid) {
            let payload = JSON.stringify(this.form.value);
            let result = await this.albumService.put(this.id, payload).then((res) => res).catch((err) => err);
            if (result.status === 200) {
                this.router.navigate(['/']);
            }
        }

    }


}
