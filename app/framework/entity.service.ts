import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
declare var jQuery: any;
@Injectable()
export class EntityService{
    private _mybean: any;
    appname : string = "";
    version : string = "";
    title : string = "";
    apiurl : string = "";

    private _rpbeanSource = new Subject<any>();
    rpbean$ = this._rpbeanSource.asObservable();

    sendBean(x: any) {
        this._mybean = x;
        this._rpbeanSource.next(x); // Push the new value into the observable stream
    }
}