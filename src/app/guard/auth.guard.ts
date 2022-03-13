import { AutenticacaoService, TokenStorageService } from '@medicar/core/services';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AutenticacaoService, private tokenStorageService: TokenStorageService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const auth = this.tokenStorageService.getAuthLocalStorage();

        if (auth && auth.token) {
            return true;
        }

        this.authService.logout();
        return false;
    }
}
