import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Image } from '../models/image';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../services/image.service';
import { GLOBAL } from '../services/global'

@Component({
    selector: 'image-edit',
    templateUrl: '../views/image-edit.html'
})

export class ImageEditComponent implements OnInit {

    public titulo: string = '';
    public albums: Image[] = [];
    public loading: boolean = false;
    public submitted: boolean = false;
    public isEdit: boolean = false;
    public form: FormGroup | any;
    public id: string = '';
    public albumId: string = '';
    public filesToUpload: File[] = [];
    public resultUpload: any;


    constructor(private imageService: ImageService, public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.titulo = 'Modificar Imagen';
        this.isEdit = true;

    }

    public async ngOnInit(): Promise<void> {

        this.route.params.forEach(async (params: Params) => {
            this.id = params['id'];
        });

        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            picture: [null],
            album: [null, Validators.required]
        });

        var image = await this.imageService.get(this.id).then((res) => res).catch((err) => err);

        if (image.status !== 200) {
            this.router.navigate(['/']);
        }
        this.form.patchValue(image.body);
        this.albumId = this.form.value.album._id;
    }

    public async btnAction(): Promise<void> {
        this.submitted = true;
        if (!this.form.invalid) {
            let payload = JSON.stringify(this.form.value);
            let result = await this.imageService.put(this.id, payload).then((res) => res).catch((err) => err);
            if (result.status !== 200) {
                return;
            }

            this.resultUpload = await this.makeFileRequest(GLOBAL.url + '/upload-image/' + this.id, [], this.filesToUpload).then((res) => res).catch((err) => err);
            console.log(this.resultUpload);
            if (!this.resultUpload) {
                return;
            }

            this.form.patchValue({
                picture: this.resultUpload.filename
            });

            var imgUpd = await this.imageService.put(this.id, JSON.stringify(this.form.value)).then((res) => res).catch((err) => err);

            if(imgUpd.status !== 200){
                return;
            }
 
            this.router.navigate(['/album', this.form.value.album._id]);
        }
    }

    public fileChangeEvent(fileInput: any) {
        this.filesToUpload = fileInput.target.files;
    }

    public async makeFileRequest(url: string, params: string[], files: File[]): Promise<any> {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for (var i = 0; i < files.length; i++) {
            formData.append('image', files[i], files[i].name);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status === 200) {
                    return JSON.parse(xhr.response);
                }
            }
        }
        xhr.open('POST', url, true);
        xhr.send(formData);
        return true;
    }




}
