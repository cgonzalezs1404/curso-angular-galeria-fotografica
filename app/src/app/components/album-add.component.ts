import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html'
})

export class AlbumAddComponent implements OnInit {

    public titulo: string = '';
    public albums: Album[] = [];
    public loading: boolean = false;
    public submitted: boolean = false;
    public form: FormGroup|any;

    constructor(private albumService: AlbumService, public formBuilder: FormBuilder, private router: Router) {
        this.titulo = 'Crear nuevo Album';
        
    }

    public async ngOnInit(): Promise<void> {
        
        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required]
        });
        
    }

    public async btnAction(): Promise<void>{
        this.submitted = true;
        if(!this.form.invalid){
            let payload = JSON.stringify(this.form.value);
            let result = await this.albumService.post(payload).then((res) => res).catch((err) => err);
            if(result.status === 200){
                this.router.navigate(['/']);
            }
        }
        
    }

    
}
