import { Injectable } from "@angular/core";
import { GLOBAL } from './global';
import { HttpClient } from "@angular/common/http";
import { Album } from "../models/album";
import { lastValueFrom, map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AlbumService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    public async get() {
        return await lastValueFrom(this._http.get(this.url + 'album', { observe: 'response' }).pipe(map((response: any) => { return response })));
    }
}