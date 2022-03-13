import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlanoComponent } from './registrar-plano.component';

describe('RegistrarPlanoComponent', () => {
  let component: RegistrarPlanoComponent;
  let fixture: ComponentFixture<RegistrarPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
