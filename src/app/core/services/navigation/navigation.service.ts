import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.urlAfterRedirects.includes('auth')) {
          this.history.push(event.urlAfterRedirects);
        }
      }
    });
  }

  back(): void {
    if (this.history.length > 0) {
      const last = this.history[this.history.length - 1];
      this.history.pop();
      this.router.navigateByUrl(last);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
