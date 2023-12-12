import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Image } from '../models/image';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../services/image.service';

@Component({
    selector: 'image-add',
    templateUrl: '../views/image-add.html'
})

export class ImageAddComponent implements OnInit {

    public titulo: string = '';
    public albums: Image[] = [];
    public loading: boolean = false;
    public submitted: boolean = false;
    public isEdit: boolean = false;
    public form: FormGroup | any;
    public albumId: string = '';

    constructor(private imageService: ImageService, public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.titulo = 'Agregar nueva Imagen';

    }

    public async ngOnInit(): Promise<void> {

        this.route.params.forEach(async (params: Params) => {
            this.albumId = params['album'];
        });

        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            picture: [null],
            album: [this.albumId, Validators.required]
        });

        console.log(this.form.value);

    }

    public async btnAction(): Promise<void> {
        this.submitted = true;
        if (!this.form.invalid) {
            
            
            this.form.patchValue({
                album: this.albumId
            });

            let payload = JSON.stringify(this.form.value);
            console.log(payload);
            let result = await this.imageService.post(payload).then((res) => res).catch((err) => err);
            if (result.status === 200) {
                this.router.navigate(['/album', this.albumId]);
            }
        }

    }


}
