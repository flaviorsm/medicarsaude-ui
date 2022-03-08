import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IService } from '..';

export abstract class ServiceBase<T> implements IService<T>{

    isLoadingSubject!: BehaviorSubject<boolean>;
    private apiUrl = '';

    constructor(
        pathApi: string,
        private http: HttpClient) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);

        this.apiUrl = `${environment.apiUrl}/${pathApi}`;
    }

    create(model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.post<any>(this.apiUrl, model)
            .pipe(
                map(res => res.data),
                catchError((err) => {
                    console.error('Erro create', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    findById(id: string): Observable<T | undefined> {
        return this.find('id', id).pipe(
            map(res => res && res.length > 0 ? res[0] : undefined));
    }

    find(field?: string, value?: string): Observable<T[] | undefined> {
        if (field && value) {
            this.apiUrl += `?%${field}=${value}`;
        }
        this.isLoadingSubject.next(true);
        return this.http.get<any>(this.apiUrl)
            .pipe(
                map(res => res.data),
                catchError((err) => {
                    console.error('Erro getVendas', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    update(id: string, model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.put<any>(`${this.apiUrl}/${id}`, model)
            .pipe(
                map(res => res.data),
                catchError((err) => {
                    console.error('Erro create', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    delete(id: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                map(res => res),
                catchError((err) => {
                    console.error('Erro getVendas', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }
}
