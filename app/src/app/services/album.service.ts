import { Injectable } from "@angular/core";
import { GLOBAL } from './global';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    public async getAll() {
        let uri = `${this.url}album`;
        return await lastValueFrom(this._http.get(uri, { observe: 'response' }).pipe(map((response: any) => { return response })));
    }

    public async get(id: string) {
        let uri = `${this.url}album/${id} `;
        return await lastValueFrom(this._http.get(uri, { observe: 'response' }).pipe(map((response: any) => { return response })));
    }

    public async post(payload: any) {
        let uri = `${this.url}album`;
        return await lastValueFrom(this._http.post(uri, payload, { observe: 'response', headers: { 'Content-Type': 'application/json' } }).pipe(map((response: any) => { return response })));

    }

    public async put(id: string, payload: any) {
        let uri = `${this.url}album/${id}`;
        return await lastValueFrom(this._http.put(uri, payload, { observe: 'response', headers: { 'Content-Type': 'application/json' } }).pipe(map((response: any) => { return response })));
    }

    public async delete(id: string) {
        let uri = `${this.url}album/${id}`;
        return await lastValueFrom(this._http.delete(uri, { observe: 'response', headers: { 'Content-Type': 'application/json' } }).pipe(map((response: any) => { return response })));
    }
}