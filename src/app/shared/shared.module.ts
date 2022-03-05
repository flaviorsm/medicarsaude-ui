import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MaskDirective } from './directive/mask/mask.directive';

@NgModule({
  declarations: [
    SplashScreenComponent,
    MaskDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SplashScreenComponent,
    ReactiveFormsModule,
    MaskDirective,
  ]
})
export class SharedModule { }
