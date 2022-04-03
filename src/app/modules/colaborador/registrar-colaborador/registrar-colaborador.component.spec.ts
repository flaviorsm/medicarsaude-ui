import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarColaboradorComponent } from './registrar-colaborador.component';

describe('RegistrarColaboradorComponent', () => {
  let component: RegistrarColaboradorComponent;
  let fixture: ComponentFixture<RegistrarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarColaboradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
