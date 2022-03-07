import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IService<T> {

    get httpHeaders(): HttpHeaders | undefined;

    create(model: T): Observable<T | undefined>;

    find(field?: string, value?: string): Observable<any[] | undefined>;

    update(id: string, model: T): Observable<T | undefined>;

    delete(id: string): Observable<any>;

}
