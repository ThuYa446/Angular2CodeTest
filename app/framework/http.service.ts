import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class HttpService {
    constructor(private http: Http) {
    }
    doGet(url: string) {
        return this.http.get(url).map(res => res);
    }
    doPost(url: string, j: any) {
        var params = JSON.stringify(j);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, params, { headers: headers }).map(res => res);
    }

    doPut(url: string,j: any){
        var params = JSON.stringify(j);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(url, params, { headers: headers }).map(res => res);
    }

    doDelete(url: string){
        return this.http.delete(url).map(res => res);
    }

    upload(url: string, files: File) {
        let fd = new FormData();
        fd.append("uploadedFile", files);  
        return this.http.post(url, fd).map(res => res.json());
    }

}