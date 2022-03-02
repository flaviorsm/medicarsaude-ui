import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SplashScreenService } from '../../services/splash-screen/splash-screen.service';

@Component({
  selector: 'rts-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  @ViewChild('splashScreen', { static: true }) splashScreen = {} as ElementRef;

  constructor(
    private splashScreenService: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.splashScreenService.init(this.splashScreen);
  }
}
