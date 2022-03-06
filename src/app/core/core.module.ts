import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from './shared/splash-screen/splash-screen.component';
import { MaskDirective } from './directives';

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    MaskDirective,
    SplashScreenComponent,
  ]
})
export class CoreModule { }
