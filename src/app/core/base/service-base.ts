import { StatusEnum } from '@medicar/core';
import { Result } from './../interfaces/result';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IService } from '..';
import { NotificationService } from '../services';

export abstract class ServiceBase<T> implements IService<T>{

    isLoadingSubject!: BehaviorSubject<boolean>;
    protected apiUrl: string;

    constructor(
        pathApi: string,
        protected http: HttpClient,
        private notification: NotificationService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);

        this.apiUrl = `${environment.apiUrl}/${pathApi}`;
    }

    create(model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.post<T>(this.apiUrl, model)
            .pipe(
                map(result => {
                    this.notification.showSuccess('Criado com sucesso!', 'Sucesso');
                    return result;
                }),
                catchError((err) => {
                    this.notification.showError(err, 'Erro ao criar');
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    findById(id: string): Observable<T | undefined> {
        return this.find('id', id).pipe(
            map((result: any) => {
                if (!result || !result.data) {
                    this.notification.showInfo('Nenhum resultado encontrado', 'Não encontrado');
                }
                return result?.data;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    find(field?: string, value?: string): Observable<Result | undefined> {
        let url = this.apiUrl;
        if (field && value) {
            url += `?${field}=${value}`;
        }
        this.isLoadingSubject.next(true);
        return this.http.get<Result>(url)
            .pipe(
                map((result: any) => {
                    if (!result || result.data.length === 0) {
                        this.notification.showInfo('Nenhum resultado encontrado', 'Não encontrado');
                    }
                    return result;
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    update(id: string, model: T): Observable<T | undefined> {
        this.isLoadingSubject.next(true);
        return this.http.put<Result>(`${this.apiUrl}/${id}`, model)
            .pipe(
                map(result => {
                    this.notification.showSuccess('Alterado com sucesso!', 'Sucesso');
                    return result.data;
                }),
                catchError((err) => {
                    this.notification.showError(err, 'Erro na alteração');
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    delete(id: string): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                map(result => {
                    this.notification.showSuccess('Excluido com sucesso!', 'Sucesso');
                    return result;
                }),
                catchError((err) => {
                    this.notification.showError(err, 'Erro ao deletar');
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
                catchError((err) => {
                    this.notification.showError(err, 'Erro ao disabilitar');
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

    path(id: string, body: any): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.patch(`${this.apiUrl}/${id}`, body)
            .pipe(
                map(res => res),
                catchError((err) => {
                    this.notification.showError(err, 'Erro ao alterar item');
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }
}
