import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarContratoComponent } from './registrar-contrato.component';

describe('RegistrarContratoComponent', () => {
  let component: RegistrarContratoComponent;
  let fixture: ComponentFixture<RegistrarContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
