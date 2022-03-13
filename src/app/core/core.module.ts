import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from '@medicar/components';
import { MaskDirective } from './directives';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
  ]
})
export class CoreModule { }
