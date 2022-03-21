import { Observable } from 'rxjs';
import { Result } from './result';

export interface IService<T> {

    find(field?: string, value?: string): Observable<Result | undefined>;

    findById(id: string): Observable<T | undefined>;

    create(model: T): Observable<T | undefined>;

    update(id: string, model: T): Observable<T | undefined>;

    delete(id: string): Observable<any>;

    disable(id: string): Observable<any>;

    path(id: string, body: any): Observable<any>;
}
