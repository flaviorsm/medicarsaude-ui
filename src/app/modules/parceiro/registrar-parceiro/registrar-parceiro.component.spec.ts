import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarParceiroComponent } from './registrar-parceiro.component';

describe('RegistrarParceiroComponent', () => {
  let component: RegistrarParceiroComponent;
  let fixture: ComponentFixture<RegistrarParceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarParceiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
