import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVendaComponent } from './registrar-venda.component';

describe('RegistrarVendaComponent', () => {
  let component: RegistrarVendaComponent;
  let fixture: ComponentFixture<RegistrarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
