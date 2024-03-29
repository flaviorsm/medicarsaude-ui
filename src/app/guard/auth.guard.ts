import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { RoleEnum } from '@medicar/core';
import { AutenticacaoService, TokenStorageService } from '@medicar/core/services';
import { NavigationService } from '@medicar/core/services/navigation/navigation.service';
import { Util } from '@medicar/core/shared/util';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AutenticacaoService,
        private tokenStorageService: TokenStorageService,
        private navigation: NavigationService) { }

    canActivate(routeActivated: ActivatedRouteSnapshot): boolean {
        return this.validationRoute(routeActivated);
    }

    canActivateChild(routeActivated: ActivatedRouteSnapshot): boolean {
        return this.validationRoute(routeActivated);
    }

    validationRoute(route: ActivatedRouteSnapshot): boolean {
        const auth = this.tokenStorageService.getAuthLocalStorage() ?? undefined;

        if (!auth || !auth.token) {
            this.authService.logout();
            return false;
        }

        if (typeof route.data.roles !== 'undefined' && route.data.roles.length > 0 && auth) {
            const rolesRoute = route.data.roles;
            const rolesUser = auth.role;

            if (!Util.hasPermission(rolesRoute)) {
                if (rolesUser === RoleEnum.CLIENTE) {
                    this.router.navigate(['/usuario/registrar/' + auth.userId]);
                } else {
                    this.navigation.backPage();
                }
                return false;
            } else {
                return true;
            }

        }

        return true;
    }


}
