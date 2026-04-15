import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, USER_PERMISSIONS } from '../services/auth-service';
import { EUserRole } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        // console.log('route', state.url);
        // debugger;
        if (this.authService.isAuthenticatedUser$()) {
            const userState = this.authService.userState$();
            if (userState?.role) {
                const userPermissions = USER_PERMISSIONS[userState.role];
                if (userPermissions.some((x) => x === state.url)) {
                    return true;
                } else {
                    if (state.url === '/' || state.url  === '/login' || state.url === '/signup') {
                        return this.router.createUrlTree([userPermissions[0]]);
                    }
                    this.router.navigate(['/']);
                }
            }
            return true;
        } else {
            if (state.url === '/' || state.url === '/login' || state.url === '/signup') {
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }

    }
}