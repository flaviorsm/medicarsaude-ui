import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, MenuComponent, SplashScreenComponent } from './components';
import { MaskDirective } from './directives';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
    HeaderComponent,
    MenuComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SplashScreenComponent,
    ReactiveFormsModule,
    MaskDirective,
    HeaderComponent,
    MenuComponent,
    TopbarComponent,
  ]
})
export class CoreModule { }
