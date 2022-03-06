import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, MenuComponent, SplashScreenComponent } from './components';
import { MaskDirective } from './directives';

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
    HeaderComponent,
    MenuComponent
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
    HeaderComponent,
    MenuComponent,
  ]
})
export class CoreModule { }
