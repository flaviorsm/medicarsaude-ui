import { StatusEnum } from '@medicar/core';
import { Result } from './../interfaces/result';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IService } from '..';

export abstract class ServiceBase<T> implements IService<T>{

    isLoadingSubject!: BehaviorSubject<boolean>;
    private apiUrl: string;

    constructor(
        pathApi: string,
        private http: HttpClient) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);

        this.apiUrl = `${environment.apiUrl}/${pathApi}`;
    }

    create(model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.post<Result>(this.apiUrl, model)
            .pipe(
                map(result => result.data),
                catchError((err) => {
                    console.error('Erro create', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    findById(id: string): Observable<T | undefined> {
        return this.find('id', id).pipe(map(res => res?.data));
    }

    find(field?: string, value?: string): Observable<Result | undefined> {
        let url = this.apiUrl;
        if (field && value) {
            url += `?${field}=${value}`;
        }
        this.isLoadingSubject.next(true);
        return this.http.get<Result>(url)
            .pipe(
                map(result => result),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    update(id: string, model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.put<Result>(`${this.apiUrl}/${id}`, model)
            .pipe(
                map(result => result.data),
                catchError((err) => {
                    console.error('Erro create', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    disable(id: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.patch(`${this.apiUrl}/${id}/${StatusEnum.INATIVO}`, { status: StatusEnum.INATIVO })
            .pipe(
                map(res => res),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    delete(id: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                map(res => res),
                catchError((err) => {
                    console.error('Erro deletar: ', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }
}
