import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SplashScreenService } from '@medicar/core/services';
import { AuthService } from './modules/auth/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'medicarsaude-ui';

  private unsubscribe: Subscription[] = [];


  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) { }


  ngOnInit(): void {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.splashScreenService.hide();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
