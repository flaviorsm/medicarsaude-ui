import { animate, AnimationBuilder, style } from '@angular/animations';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  private el = {} as ElementRef;
  private stopped = true;

  constructor(private animationBuilder: AnimationBuilder) { }

  init(element: ElementRef): void {
    this.el = element;
  }

  hide(): void {
    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(800, style({ opacity: '0' }))])
      .create(this.el.nativeElement);

    player.onDone(() => {
      if (typeof this.el.nativeElement.remove === 'function') {
        this.el.nativeElement.remove();
      } else {
        this.el.nativeElement.style.display = 'none !important';
      }
      this.stopped = true;
    });

    setTimeout(() => player.play(), 100);
  }
}
